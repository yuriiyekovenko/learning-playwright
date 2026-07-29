import { Page, Locator } from '@playwright/test';
import { BaseAuthenticatedPage } from './BaseAuthenticatedPage';

export class CheckoutStepTwoPage extends BaseAuthenticatedPage {
    readonly finishButton: Locator;

    constructor(page: Page) {
        super(page);
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
    }

    async completeCheckout() {
        await this.finishButton.click();
    }
}
