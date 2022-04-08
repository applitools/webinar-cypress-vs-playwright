import { Page, Locator } from '@playwright/test';

export class LoginPage {
    page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("id=username");
        this.passwordInput = page.locator("id=password");
        this.loginButton = page.locator("id=log-in")
    }

    async load() {
        await this.page.goto("https://demo.applitools.com/");
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}