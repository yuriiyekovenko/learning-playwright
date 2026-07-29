import { Page, Locator } from '@playwright/test';
import { BaseAuthenticatedPage } from './BaseAuthenticatedPage';

export class CartPage extends BaseAuthenticatedPage {
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}
