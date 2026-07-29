import { test, expect } from '../fixtures/fixtures';
import { env } from '../config/env';

test.beforeEach('login as standard user', async ({ pages }) => {
    await pages.login.open();
    await pages.login.login(env.username, env.password);
});

test('smoke test: buy single item', async ({ pages, page }) => {
    await pages.inventory.expectCartToBeEmpty();
    await pages.inventory.addItemToCart('Sauce Labs Backpack');
    await pages.inventory.expectCartCount(1);

    await pages.inventory.gotoCart();
    await pages.cart.checkout();
    await pages.checkoutStepOne.enterCustomerInfo('Sam', 'Jones', '1234AB');

    await pages.checkoutStepTwo.expectTitle('Checkout: Overview');
    // TODO add more checks

    await pages.checkoutStepTwo.completeCheckout();
    await pages.checkoutComplete.expectTitle('Checkout: Complete!');
    await expect(page.getByRole('heading', { level: 2 })).toHaveText('Thank you for your order!');
    await pages.inventory.expectCartToBeEmpty();
    await pages.checkoutComplete.backHome();
    await pages.inventory.expectTitle('Products');
});
