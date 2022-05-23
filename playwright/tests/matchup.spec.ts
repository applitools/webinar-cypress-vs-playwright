import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../models/LoginPage';
import { MainPage } from '../models/MainPage';

test.describe('Playwright', () => {

    test('Round 1: Element Interaction', async ({ page }) => {

        await page.goto("https://demo.applitools.com/");

        await page.locator("id=username").fill("andy");
        await page.locator("id=password").fill("panda<3");
        await page.locator("id=log-in").click();
        
        await expect(page.locator(".element-header").first()).toHaveText("Financial Overview");
    });

    test('Round 2: Inline Frames', async ({ page }) => {
        await page.goto("https://kitchen.applitools.com/ingredients/iframe");
        
        const iframe = page.frameLocator("id=the-kitchen-table");
        const table = iframe.locator("id=fruits-vegetables");

        await expect(table).toBeVisible();
    });

    test('Round 3: Waiting', async ({ page }) => {
        await page.goto("https://automationbookstore.dev/");
        await page.locator("id=searchBar").fill("testing");
        await expect(page.locator("li:visible")).toHaveCount(1);
    });

    test('Round 4: Accept Alerts', async ({ page }) => {
        page.on('dialog', dialog => {
            expect(dialog.message()).toBe("Airfryers can make anything!");
            dialog.accept();
        });

        await page.goto("https://kitchen.applitools.com/ingredients/alert");
        await page.locator("id=alert-button").click();
    });

    test('Round 4: Dismiss Alerts', async ({ page }) => {
        page.on('dialog', dialog => dialog.dismiss());
        await page.goto("https://kitchen.applitools.com/ingredients/alert");
        await page.locator("id=confirm-button").click();
    });

    test('Round 4: Answer Prompts', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept("nachos"));
        await page.goto("https://kitchen.applitools.com/ingredients/alert");
        await page.locator("id=prompt-button").click();
    });

    test('Round 5: Navigation to New Windows', async ({ page, context}) => {
        await page.goto("https://kitchen.applitools.com/ingredients/links");

        let [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.locator("id=button-the-kitchen-table").click()
        ]);
        
        await newPage.waitForLoadState();
        expect(newPage.url()).toContain('/ingredients/table');
        await expect(newPage.locator("id=fruits-vegetables")).toBeVisible();
    });

    test('Round 6: API Requests', async () => {
        const requestContext = await request.newContext({baseURL: 'https://kitchen.applitools.com'});
        const response = await requestContext.get('api/recipes');
        await expect(response).toBeOK();
        
        const body = await response.json();
        expect(body.time).toBeGreaterThan(0);
        expect(body.data.length).toBeGreaterThan(0);
    });

    test('Round 7: Page Objects', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.load();
        await loginPage.login("andy", "panda<3");

        const mainPage = new MainPage(page);
        await expect(mainPage.headers.first()).toHaveText("Financial Overview");
    });

});