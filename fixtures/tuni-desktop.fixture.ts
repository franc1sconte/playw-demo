import { test as base, expect } from '@playwright/test';
import { TuniLoginPage } from '../pages/tuni-desktop/TuniLoginPage';
import { TuniHomePage } from '../pages/tuni-desktop/TuniHomePage';
import { TuniCourseDetailPage } from '../pages/tuni-desktop/TuniCourseDetailPage';
import { TuniTutorPage } from '../pages/tuni-desktop/TuniTutorPage';
import { URLS } from '../config/urls';
import { CREDENTIALS } from '../config/credentials';

type TuniDesktopFixtures = {
  loginPage: TuniLoginPage;
  homePage: TuniHomePage;
  courseDetailPage: TuniCourseDetailPage;
  tutorPage: TuniTutorPage;
};

export const test = base.extend<TuniDesktopFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(URLS.tuni.staging.login);
    await page.waitForLoadState('domcontentloaded');
    const login = new TuniLoginPage(page);
    await login.iniciarSesion(CREDENTIALS.tuni.username, CREDENTIALS.tuni.password);
    await use(login);
  },
  homePage: async ({ loginPage, page }, use) => {
    void loginPage;
    await use(new TuniHomePage(page));
  },
  courseDetailPage: async ({ loginPage, page }, use) => {
    void loginPage;
    await use(new TuniCourseDetailPage(page));
  },
  tutorPage: async ({ loginPage, page }, use) => {
    void loginPage;
    await use(new TuniTutorPage(page));
  },
});

export { expect };
