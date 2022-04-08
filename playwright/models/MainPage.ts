import { Page, Locator } from '@playwright/test';

export class MainPage {
    page: Page;
    headers: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headers = page.locator(".element-header");
    }
}