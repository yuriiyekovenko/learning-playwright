import { Page } from '@playwright/test';
import { BaseAuthenticatedPage } from './BaseAuthenticatedPage';

export class InventoryPage extends BaseAuthenticatedPage {
    constructor(page: Page) {
        super(page);
    }

    private inventoryItem(itemName: string) {
        return this.page.getByTestId('inventory-item').filter({ hasText: itemName });
    }

    async addItemToCart(itemName: string) {
        await this.inventoryItem(itemName).getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeItemFromCart(itemName: string) {
        await this.inventoryItem(itemName).getByRole('button', { name: 'Remove' }).click();
    }
}
