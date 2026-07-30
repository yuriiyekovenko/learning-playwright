import { Page, TestInfo } from '@playwright/test';

export async function takeScreenshot(page: Page, testInfo: TestInfo) {
    const testName = testInfo.title.replace(/[^\w-]/g, '_');
    await page.screenshot({
        path: `screenshots/${testName}_${Date.now()}.png`,
        fullPage: true,
    });
}
