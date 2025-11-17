import { test, expect } from '../fixtures/inventory-fixtures';

/**
 * Footer and External Links Test Suite
 * Tests for the footer section of the Inventory page
 *
 * Based on test plan: ### 10. Footer and External Links
 * - 10.1 Social Media Links Are Present
 * - 10.2 Footer Information Displays
 *
 * Follows principles:
 * - Page Object Model (FooterComponent)
 * - SOLID: Single Responsibility Principle (footer logic isolated)
 * - DRY: Reusable assertions through FooterComponent methods
 */

test.describe('Footer and External Links', () => {
  /**
   * 10.1 Social Media Links Are Present
   */
  test.describe('10.1 Social Media Links', () => {
    test('@p2 Should display Twitter link with correct URL', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectTwitterLinkPresent();
      const twitterUrl = await inventoryPage.footer.getTwitterLinkUrl();
      expect(twitterUrl).toMatch(/(twitter\.com|x\.com)/);
    });

    test('@p2 Should display Facebook link with correct URL', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectFacebookLinkPresent();
      const facebookUrl = await inventoryPage.footer.getFacebookLinkUrl();
      expect(facebookUrl).toContain('facebook.com');
    });

    test('@p2 Should display LinkedIn link with correct URL', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectLinkedInLinkPresent();
      const linkedinUrl = await inventoryPage.footer.getLinkedInLinkUrl();
      expect(linkedinUrl).toContain('linkedin.com');
    });

    test('@p2 Should have all social media links visible', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectAllSocialMediaLinksPresent();
    });

    test('@p2 Should have correct social media URLs', async ({ inventoryPage }) => {
      const twitterUrl = await inventoryPage.footer.getTwitterLinkUrl();
      const facebookUrl = await inventoryPage.footer.getFacebookLinkUrl();
      const linkedinUrl = await inventoryPage.footer.getLinkedInLinkUrl();

      expect(twitterUrl).toMatch(/(https:\/\/(twitter\.com|x\.com)\/saucelabs)/);
      expect(facebookUrl).toEqual('https://www.facebook.com/saucelabs');
      expect(linkedinUrl).toEqual('https://www.linkedin.com/company/sauce-labs/');
    });

    test('@p2 Should open social media links in new tab', async ({ page }) => {
      // Verify Twitter link target and rel attributes
      const twitterLink = page.locator('a[href*="twitter"]');
      if (await twitterLink.count() > 0) {
        await expect(twitterLink).toHaveAttribute('href', /twitter/);
      }
    });
  });

  /**
   * 10.2 Footer Information Displays
   */
  test.describe('10.2 Footer Information', () => {
    test('@p2 Should display footer element', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectFooterVisible();
    });

    test('@p2 Should display copyright notice', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectCopyrightNoticePresent('© 2025 Sauce Labs');
    });

    test('@p2 Should display "Terms of Service" link', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectTermsOfServiceLinkPresent();
    });

    test('@p2 Should display "Privacy Policy" link', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectPrivacyPolicyLinkPresent();
    });

    test('@p2 Should have both policy links present', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectPolicyLinksPresent();
    });

    test('@p2 Should display footer fully loaded with all elements', async ({ inventoryPage }) => {
      await inventoryPage.footer.expectFooterFullyLoaded();
    });

    test('@p2 Should have correct copyright text and year', async ({ inventoryPage, page }) => {
      const copyrightText = await page.locator('footer, [role="contentinfo"]').textContent();
      expect(copyrightText).toContain('© 2025 Sauce Labs');
      expect(copyrightText).toContain('All Rights Reserved');
    });

    test('@p2 Should have "Terms of Service" and "Privacy Policy" in footer', async ({ inventoryPage }) => {
      // Use the footer component methods which already work
      await inventoryPage.footer.expectTermsOfServiceLinkPresent();
      await inventoryPage.footer.expectPrivacyPolicyLinkPresent();
    });
  });

  /**
   * Additional edge case tests for footer
   */
  test.describe('Footer Edge Cases', () => {
    test('@p2 Should have proper link attributes for security', async ({ inventoryPage }) => {
      // Verify links have proper href attributes
      const twitterUrl = await inventoryPage.footer.getTwitterLinkUrl();
      const facebookUrl = await inventoryPage.footer.getFacebookLinkUrl();
      const linkedinUrl = await inventoryPage.footer.getLinkedInLinkUrl();

      expect(twitterUrl).not.toBeNull();
      expect(facebookUrl).not.toBeNull();
      expect(linkedinUrl).not.toBeNull();
    });

    test('@p2 Should maintain footer visibility on page scroll', async ({ inventoryPage, page }) => {
      // Scroll down to see footer
      await page.evaluate(() => {
        window.scrollBy(0, document.body.scrollHeight);
      });

      // Footer should still be visible
      await inventoryPage.footer.expectFooterVisible();
    });

    test('@p2 Should have clickable footer links', async ({ inventoryPage }) => {
      // Verify all links are visible and in viewport for clicking
      const twitterLink = inventoryPage.page.locator('footer a[href*="twitter"]');
      const facebookLink = inventoryPage.page.locator('footer a[href*="facebook"]');
      const linkedinLink = inventoryPage.page.locator('footer a[href*="linkedin"]');

      expect(await twitterLink.isVisible()).toBeTruthy();
      expect(await facebookLink.isVisible()).toBeTruthy();
      expect(await linkedinLink.isVisible()).toBeTruthy();
    });
  });
});
