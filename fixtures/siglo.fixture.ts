import { test as base, expect } from '@playwright/test';
import { SigloLoginPage } from '../pages/siglo/SigloLoginPage';
import { SigloDashboardPage } from '../pages/siglo/SigloDashboardPage';
import { SigloTuniWidgetPage } from '../pages/siglo/SigloTuniWidgetPage';
import { URLS } from '../config/urls';
import { CREDENTIALS } from '../config/credentials';

type SigloFixtures = {
  loginPage: SigloLoginPage;
  dashboardPage: SigloDashboardPage;
  tuniWidget: SigloTuniWidgetPage;
};

export const test = base.extend<SigloFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(URLS.siglo.prod.login);
    await page.waitForLoadState('domcontentloaded');
    const login = new SigloLoginPage(page);
    // Skip login form if storageState already has a valid Canvas session
    // (page.goto to login URL redirects straight to dashboard in that case).
    if (page.url().includes('/login')) {
      await login.iniciarSesion(CREDENTIALS.siglo.username, CREDENTIALS.siglo.password);
    }
    await use(login);
  },
  dashboardPage: async ({ loginPage, page }, use) => {
    void loginPage;
    await use(new SigloDashboardPage(page));
  },
  tuniWidget: async ({ loginPage, page }, use) => {
    void loginPage;
    await use(new SigloTuniWidgetPage(page));
  },
});

export { expect };
