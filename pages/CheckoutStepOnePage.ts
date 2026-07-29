import { Page, Locator } from '@playwright/test';
import { BaseAuthenticatedPage } from './BaseAuthenticatedPage';

export class CheckoutStepOnePage extends BaseAuthenticatedPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipInput: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.zipInput = this.page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    async enterCustomerInfo(firstName: string, lastName: string, zip: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipInput.fill(zip);
        await this.continueButton.click();
    }
}
