import { test as base } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

export { expect } from '@playwright/test';

type MyFixtures = {
    pages: PageManager;
};

export const test = base.extend<MyFixtures>({
    pages: async ({ page }, use) => {
        await use(new PageManager(page));
    },
});
