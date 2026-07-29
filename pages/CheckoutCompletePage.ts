import { Page, Locator } from '@playwright/test';
import { BaseAuthenticatedPage } from './BaseAuthenticatedPage';

export class CheckoutCompletePage extends BaseAuthenticatedPage {
    readonly homeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.homeButton = this.page.getByRole('button', { name: 'Back Home' });
    }

    async backHome() {
        await this.homeButton.click();
    }
}
