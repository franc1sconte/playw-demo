import { chromium, Page, BrowserContext } from '@playwright/test';
import { CREDENTIALS } from './config/credentials';
import { URLS } from './config/urls';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export const TUNI_AUTH_FILE = join(__dirname, 'playwright/.auth/siglo-tuni.json');

async function loginToCanvas(page: Page): Promise<void> {
  await page.goto(URLS.siglo.prod.login);
  await page.locator('#pseudonym_session_unique_id').fill(CREDENTIALS.siglo.username);
  await page.locator('#pseudonym_session_password').fill(CREDENTIALS.siglo.password);
  await page.locator('#login_form input[type="submit"]').click();
  await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 15000 });
}

async function navigateToTuniWidget(page: Page): Promise<void> {
  await page.goto(URLS.siglo.prod.canvasCourses);
  const normalized = 'Introducción al Derecho'.normalize('NFD').replace(/[̀-ͯ]/gu, '');
  await page.getByRole('link', { name: new RegExp(normalized, 'i') }).click();
  await page.locator('button.tuni-float-btn').waitFor({ state: 'visible', timeout: 20000 });
}

async function completeTuniOAuth(page: Page, context: BrowserContext): Promise<Page> {
  await page.getByRole('button', { name: 'Abrir chat' }).click();
  await page.getByRole('button', { name: /Ir a TUNI/ }).click();

  // Listen at context level to catch siglo21.educabot.com regardless of which
  // window opens it (the TUNI callback does window.open from inside the OAuth popup).
  const tuniPagePromise = new Promise<Page>((resolve) => {
    context.on('page', (newPage) => {
      newPage.waitForURL(url => url.toString().includes('educabot.com'), { timeout: 30000 })
        .then(() => resolve(newPage))
        .catch(() => {});
    });
  });

  // "Continuar" opens Canvas OAuth popup
  const [oauthPopup] = await Promise.all([
    page.waitForEvent('popup', { timeout: 10000 }),
    page.getByRole('button', { name: 'Continuar' }).click(),
  ]);

  // Canvas OAuth confirmation may require an explicit "Autorizar" click
  try {
    await oauthPopup.waitForURL(/oauth2/, { timeout: 8000 });
    for (const name of ['Autorizar', 'Authorize', 'Aceptar']) {
      const btn = oauthPopup.getByRole('button', { name });
      if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await btn.click();
        break;
      }
    }
  } catch {
    // Auto-confirmed — no button needed
  }

  // Wait until the TUNI page (opened by window.open in the callback) is stable
  const tuniPage = await tuniPagePromise;
  await tuniPage.waitForLoadState('domcontentloaded', { timeout: 20000 });
  return tuniPage;
}

export default async function globalSetup(): Promise<void> {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await loginToCanvas(page);
    await navigateToTuniWidget(page);
    const tuniPage = await completeTuniOAuth(page, context);

    // Read any TUNI auth tokens stored in IndexedDB (not captured by storageState).
    const tuniIndexedDB = await tuniPage.evaluate(async () => {
      const dbs = await indexedDB.databases();
      const result: Record<string, Record<string, unknown>> = {};
      for (const info of dbs) {
        if (!info.name) continue;
        await new Promise<void>((resolve, reject) => {
          const req = indexedDB.open(info.name!);
          req.onsuccess = () => {
            const db = req.result;
            const stores: Record<string, unknown[]> = {};
            let remaining = db.objectStoreNames.length;
            if (remaining === 0) { result[info.name!] = stores; resolve(); return; }
            for (const storeName of Array.from(db.objectStoreNames)) {
              const tx = db.transaction(storeName, 'readonly');
              const getAll = tx.objectStore(storeName).getAll();
              getAll.onsuccess = () => {
                stores[storeName] = getAll.result;
                if (--remaining === 0) { result[info.name!] = stores; resolve(); }
              };
              getAll.onerror = () => { if (--remaining === 0) { result[info.name!] = stores; resolve(); } };
            }
          };
          req.onerror = () => reject(req.error);
        });
      }
      return result;
    }).catch(() => ({}));

    const fullState = await context.storageState();

    // Save the full session state (Canvas cookies + TUNI tokens + Auth0 state).
    // The Canvas session is needed so that Canvas OAuth auto-authorizes on re-use
    // instead of showing the /oauth2/confirm confirmation page again.
    const tuniState = {
      ...fullState,
      indexedDB: tuniIndexedDB,
    };

    const authDir = join(__dirname, 'playwright/.auth');
    if (!existsSync(authDir)) mkdirSync(authDir, { recursive: true });
    writeFileSync(TUNI_AUTH_FILE, JSON.stringify(tuniState, null, 2));

    console.log('TUNI auth state saved to', TUNI_AUTH_FILE);
  } finally {
    await browser.close();
  }
}
