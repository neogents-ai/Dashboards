import { test, expect } from '@playwright/test';

/**
 * Affiliate page end-to-end verification.
 *
 * Goals:
 *  - Hero copy reflects the NEO Gents brand (no "laid off" framing).
 *  - Footer Terms/Privacy links route to real hash routes.
 *  - Signup form submits to /api/affiliates/signup and displays the
 *    backend-generated referral code + shareable link.
 *  - No console errors or failed network requests.
 */

test.describe('affiliate page', () => {
  test('renders branded hero and valid footer links', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText ?? 'unknown'}`);
    });

    await page.goto('/#/affiliates');
    await page.waitForLoadState('networkidle');

    // Hero should show the new value proposition, not the old job-loss framing.
    const hero = page.getByRole('heading', { level: 1 });
    await expect(hero).toContainText('Earn Recurring Income');
    await expect(hero).toContainText('By Sharing Real AI Leads');
    await expect(hero).not.toContainText('Laid Off');

    // Footer links should point to real routes.
    const termsLink = page.locator('footer').getByRole('link', { name: 'Terms' });
    const privacyLink = page.locator('footer').getByRole('link', { name: 'Privacy' });
    await expect(termsLink).toHaveAttribute('href', '#/terms');
    await expect(privacyLink).toHaveAttribute('href', '#/privacy');

    // Clean report.
    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });

  test('signup form submits and shows backend referral code', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText ?? 'unknown'}`);
    });

    // Mock the backend so we don't create real affiliate records in production tests.
    await page.route('/api/affiliates/signup', async (route, request) => {
      if (request.method() === 'POST') {
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            message: 'Welcome to the team!',
            affiliate: {
              id: 'aff-test-123',
              name: 'Test User',
              email: 'test@example.com',
              referralCode: 'TEST12',
              status: 'pending',
            },
          }),
        });
      }
      return route.continue();
    });

    await page.goto('/#/affiliates');
    await page.waitForLoadState('networkidle');

    // Fill and submit the signup form.
    await page.getByPlaceholder('Your full name').fill('Test User');
    await page.getByPlaceholder('Email address').fill('test@example.com');
    await page.locator('select').selectOption('social');
    await page.getByRole('button', { name: 'Get My Link' }).click();

    // Success state.
    await expect(page.getByText("You're In!")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('TEST12', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Copy Link' })).toBeVisible();

    // The shareable link should contain the backend referral code.
    await expect(page.getByText(/\?ref=TEST12$/)).toBeVisible();

    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });
});
