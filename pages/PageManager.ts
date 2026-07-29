import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { InventoryPage } from './InventoryPage';
import { InventoryItemPage } from './InventoryItemPage';
import { CartPage } from './CartPage';
import { CheckoutStepOnePage } from './CheckoutStepOnePage';
import { CheckoutStepTwoPage } from './CheckoutStepTwoPage';
import { CheckoutCompletePage } from './CheckoutCompletePage';

export class PageManager {
    private _login?: LoginPage;
    private _inventory?: InventoryPage;
    private _inventoryItem?: InventoryItemPage;
    private _cart?: CartPage;
    private _checkoutStepOne?: CheckoutStepOnePage;
    private _checkoutStepTwo?: CheckoutStepTwoPage;
    private _checkoutComplete?: CheckoutCompletePage;

    constructor(private page: Page) {}

    get login(): LoginPage {
        return (this._login ??= new LoginPage(this.page));
    }

    get inventory(): InventoryPage {
        return (this._inventory ??= new InventoryPage(this.page));
    }

    get inventoryItem(): InventoryItemPage {
        return (this._inventoryItem ??= new InventoryItemPage(this.page));
    }

    get cart(): CartPage {
        return (this._cart ??= new CartPage(this.page));
    }

    get checkoutStepOne(): CheckoutStepOnePage {
        return (this._checkoutStepOne ??= new CheckoutStepOnePage(this.page));
    }

    get checkoutStepTwo(): CheckoutStepTwoPage {
        return (this._checkoutStepTwo ??= new CheckoutStepTwoPage(this.page));
    }

    get checkoutComplete(): CheckoutCompletePage {
        return (this._checkoutComplete ??= new CheckoutCompletePage(this.page));
    }
}
