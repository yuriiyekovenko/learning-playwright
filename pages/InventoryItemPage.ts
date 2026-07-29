import { Page } from '@playwright/test';
import { BaseAuthenticatedPage } from './BaseAuthenticatedPage';

export class InventoryItemPage extends BaseAuthenticatedPage {
    constructor(page: Page) {
        super(page);
    }
}
