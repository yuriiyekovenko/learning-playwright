import { test, expect } from '../fixtures/fixtures';
import { takeScreenshot } from '../helpers/utils';
import { env } from '../config/env';
import { fakerNL } from '@faker-js/faker';

test.beforeEach('login as standard user', async ({ pages }) => {
    await pages.login.open();
    await pages.login.login(env.username, env.password);
});

test('smoke test: buy single item', async ({ pages, page }, testInfo) => {
    await pages.inventory.expectCartToBeEmpty();
    await pages.inventory.addItemToCart('Sauce Labs Backpack');
    await pages.inventory.expectCartCount(1);

    await pages.inventory.gotoCart();
    await pages.cart.checkout();
    const firstName = fakerNL.person.firstName();
    const lastName = fakerNL.person.lastName();
    const zipCode = fakerNL.location.zipCode();
    await pages.checkoutStepOne.enterCustomerInfo(firstName, lastName, zipCode);
    // await takeScreenshot(page, testInfo);

    await pages.checkoutStepTwo.expectTitle('Checkout: Overview');
    // TODO add more checks

    await pages.checkoutStepTwo.completeCheckout();
    await pages.checkoutComplete.expectTitle('Checkout: Complete!');
    await expect(page.getByRole('heading', { level: 2 })).toHaveText('Thank you for your order!');
    await pages.inventory.expectCartToBeEmpty();
    await pages.checkoutComplete.backHome();
    await pages.inventory.expectTitle('Products');
});
