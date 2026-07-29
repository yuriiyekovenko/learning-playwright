import { test, expect } from '../fixtures/fixtures';
import { env } from '../config/env';

test('login as standard user', async ({ pages }) => {
    await pages.login.open();
    await pages.login.login(env.username, env.password);
    // Successful login redirects to the inventory page.
    await pages.inventory.expectTitle('Products');
});

test('log out', async ({ pages }) => {
    await pages.login.open();
    await pages.login.login(env.username, env.password);
    await pages.inventory.logout();
    await expect(pages.login.loginButton).toBeVisible();
});
