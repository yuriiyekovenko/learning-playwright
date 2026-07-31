import { Page, Locator, expect } from '@playwright/test';
import { BaseAuthenticatedPage } from './BaseAuthenticatedPage';

export class InventoryPage extends BaseAuthenticatedPage {
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryItems = this.page.getByTestId('inventory-item');
    }

    private inventoryItem(itemName: string) {
        return this.inventoryItems.filter({ hasText: itemName });
    }

    async addItemToCart(itemName: string) {
        await this.inventoryItem(itemName).getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeItemFromCart(itemName: string) {
        await this.inventoryItem(itemName).getByRole('button', { name: 'Remove' }).click();
    }

    async getItemPrice(itemName: string) {
        const priceLocator = this.inventoryItem(itemName).getByTestId('inventory-item-price');
        await expect(priceLocator).toHaveText(/^\$\d+(?:\.\d{2})$/);

        const priceText = await priceLocator.textContent();
        if (priceText === null) {
            throw new Error(`Price text for "${itemName}" is not defined`);
        }

        const parsedPrice = Number.parseFloat(priceText.slice(1));
        if (Number.isNaN(parsedPrice)) {
            throw new Error(`Price for "${itemName}" is not a valid number: "${priceText}"`);
        }

        return parsedPrice;
    }

    async openItemDetails(itemName: string) {
        await this.inventoryItem(itemName).getByTestId('inventory-item-name').click();
    }
}
