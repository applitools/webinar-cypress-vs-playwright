import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../models/LoginPage';
import { MainPage } from '../models/MainPage';
import * as path from 'path';

test.describe('Playwright', () => {

    test('Round 1: Element Interaction', async ({ page }) => {
        await page.goto("https://demo.applitools.com/");
        await page.locator("id=username").fill("andy");
        await page.locator("id=password").fill("panda<3");
        await page.locator("id=log-in").click();
        await expect(page.locator(".element-header").nth(0)).toHaveText("Financial Overview");
    });

    test('Round 2: Dropdowns', async ({ page }) => {
        await page.goto("https://kitchen.applitools.com/ingredients/select");

        let dropdown = page.locator("id=spices-select-single");
        await dropdown.selectOption("ginger");
        await expect(dropdown).toHaveValue("ginger");
    });

    test('Round 3: File Upload', async ({ page }) => {
        let picPath = path.join("..", "images", "banner.jpeg");
        await page.goto("https://kitchen.applitools.com/ingredients/file-picker");
        await page.locator("id=photo-upload").setInputFiles(picPath);
    });

    test('Round 4: Inline Frames', async ({ page }) => {
        await page.goto("https://kitchen.applitools.com/ingredients/iframe");
        await expect(page.frameLocator("id=the-kitchen-table").locator("id=fruits-vegetables")).toBeVisible();
    });

    test('Round 5: Waiting', async ({ page }) => {
        await page.goto("https://automationbookstore.dev/");
        await page.locator("id=searchBar").fill("testing");

        // The line below explicitly waits for elements to become hidden.
        // However, this is not required because the subsequent assertion implicitly covers it.
        await page.locator("li.ui-screen-hidden").nth(0).waitFor({state: 'hidden', timeout: 5000})
        
        // This line implicitly waits for the page to display only one item.
        // The search query "testing" should have exactly one result.
        await expect(page.locator("li:not(.ui-screen-hidden)")).toHaveCount(1);
    });

    test('Round 6: Accept Alerts', async ({ page }) => {
        // By default, Playwright accepts all alerts.
        // For this test, the following line is unnecessary, but it is included for the example:
        page.on('dialog', dialog => dialog.accept())

        await page.goto("https://kitchen.applitools.com/ingredients/alert");
        await page.locator("id=alert-button").click();
    });

    test('Round 6: Dismiss Alerts', async ({ page }) => {
        page.on('dialog', dialog => dialog.dismiss());
        await page.goto("https://kitchen.applitools.com/ingredients/alert");
        await page.locator("id=confirm-button").click();
    });

    test('Round 6: Answer Prompts', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept("nachos"));
        await page.goto("https://kitchen.applitools.com/ingredients/alert");
        await page.locator("id=prompt-button").click();
    });

    test('Round 7: Navigation to New Window', async ({ page, context}) => {
        await page.goto("https://kitchen.applitools.com/ingredients/links");

        let [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.locator("id=button-the-kitchen-table").click()
        ]);
        
        await newPage.waitForLoadState();
        await expect(newPage.locator("id=fruits-vegetables")).toBeVisible();
    });

    test('Round 8: API Requests', async () => {
        const requestContext = await request.newContext({baseURL: 'https://kitchen.applitools.com'});
        const response = await requestContext.get('api/recipes');
        await expect(response).toBeOK();
        
        const body = await response.json();
        await expect(body.time).toBeGreaterThan(0);
        await expect(body.data.length).toBeGreaterThan(0);
    });

    test('Round 9: Screenshots', async ({ page }) => {
        await page.goto("https://kitchen.applitools.com/ingredients/table");
        await page.locator("id=column-button-name").click();

        // Full page
        await page.screenshot({path: "screenshots/fullPage.png", fullPage: true});

        // Individual element
        await page.locator("id=fruits-vegetables").screenshot({path: "screenshots/individualElement.png"})
    });

    test('Round 10: Page Objects', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.load();
        await loginPage.login("andy", "panda<3");

        const mainPage = new MainPage(page);
        await expect(mainPage.headers.nth(0)).toHaveText("Financial Overview");
    });

});