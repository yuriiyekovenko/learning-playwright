import { test } from '../../fixtures/fixtures';
import { env } from '../../config/env';

test.beforeEach('login as standard user', async ({ pages }) => {
    await pages.login.open();
    await pages.login.login(env.username, env.password);
});

test('add multiple products to cart', async ({ pages }) => {
    await pages.inventory.addItemToCart('Sauce Labs Backpack');
    await pages.inventory.addItemToCart('Sauce Labs Bike Light');

    await pages.inventory.expectCartCount(2);
});

test('remove one item keeps remaining cart count', async ({ pages }) => {
    await pages.inventory.addItemToCart('Sauce Labs Backpack');
    await pages.inventory.addItemToCart('Sauce Labs Bike Light');
    await pages.inventory.removeItemFromCart('Sauce Labs Bike Light');

    await pages.inventory.expectCartCount(1);
});

test('add product from item details page', async ({ pages }) => {
    await pages.inventory.openItemDetails('Sauce Labs Backpack');
    await pages.inventoryItem.expectOnItemDetailsPage();
    await pages.inventoryItem.addItemToCart();
    await pages.inventoryItem.expectCartCount(1);
    await pages.inventoryItem.backToProducts();

    await pages.inventory.expectTitle('Products');
    await pages.inventory.expectCartCount(1);
});

test('selected items are visible in cart', async ({ pages }) => {
    const selectedItems = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];
    for (const itemName of selectedItems) {
        await pages.inventory.addItemToCart(itemName);
    }

    await pages.inventory.gotoCart();
    await pages.cart.expectTitle('Your Cart');
    await pages.cart.expectItemsInCart(selectedItems);
});

test('continue shopping from cart', async ({ pages }) => {
    await pages.inventory.addItemToCart('Sauce Labs Backpack');
    await pages.inventory.gotoCart();
    await pages.cart.continueShopping();

    await pages.inventory.expectTitle('Products');
    await pages.inventory.expectCartCount(1);
});
