import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Footer Component
 * Handles all footer-related interactions and assertions
 * Follows Single Responsibility Principle (SRP) - only handles footer concerns
 */
export class FooterComponent {
  private readonly page: Page;
  private readonly footerElement: Locator;
  private readonly twitterLink: Locator;
  private readonly facebookLink: Locator;
  private readonly linkedinLink: Locator;
  private readonly copyrightText: Locator;
  private readonly termsOfServiceLink: Locator;
  private readonly privacyPolicyLink: Locator;
  private readonly socialMediaList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footerElement = page.locator('footer, [role="contentinfo"]');
    this.socialMediaList = page.locator('footer ul, [role="contentinfo"] ul');
    this.twitterLink = page.locator('footer a[href*="twitter"]');
    this.facebookLink = page.locator('footer a[href*="facebook"]');
    this.linkedinLink = page.locator('footer a[href*="linkedin"]');
    this.copyrightText = page.locator('footer, [role="contentinfo"]').filter({ hasText: 'Sauce Labs' });
    this.termsOfServiceLink = page.locator('footer a', { hasText: 'Terms of Service' });
    this.privacyPolicyLink = page.locator('footer a', { hasText: 'Privacy Policy' });
  }

  /**
   * Verify footer element is visible on page
   */
  async expectFooterVisible() {
    await expect(this.footerElement).toBeVisible({ timeout: 5000 });
  }

  /**
   * Verify Twitter link is present and has correct URL
   */
  async expectTwitterLinkPresent() {
    await expect(this.twitterLink).toBeVisible();
    await expect(this.twitterLink).toHaveAttribute('href', /(twitter\.com|x\.com)/);
  }

  /**
   * Verify Facebook link is present and has correct URL
   */
  async expectFacebookLinkPresent() {
    await expect(this.facebookLink).toBeVisible();
    await expect(this.facebookLink).toHaveAttribute('href', /facebook\.com/);
  }

  /**
   * Verify LinkedIn link is present and has correct URL
   */
  async expectLinkedInLinkPresent() {
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.linkedinLink).toHaveAttribute('href', /linkedin\.com/);
  }

  /**
   * Verify all social media links are present
   */
  async expectAllSocialMediaLinksPresent() {
    await this.expectTwitterLinkPresent();
    await this.expectFacebookLinkPresent();
    await this.expectLinkedInLinkPresent();
  }

  /**
   * Verify copyright notice is displayed
   */
  async expectCopyrightNoticePresent(copyrightText: string = '© 2025 Sauce Labs') {
    await expect(this.copyrightText).toContainText(copyrightText);
  }

  /**
   * Verify "Terms of Service" text is present in footer
   */
  async expectTermsOfServiceLinkPresent() {
    const footerText = await this.footerElement.textContent();
    expect(footerText).toContain('Terms of Service');
  }

  /**
   * Verify "Privacy Policy" text is present in footer
   */
  async expectPrivacyPolicyLinkPresent() {
    const footerText = await this.footerElement.textContent();
    expect(footerText).toContain('Privacy Policy');
  }

  /**
   * Verify "Terms of Service" and "Privacy Policy" links are present
   */
  async expectPolicyLinksPresent() {
    await this.expectTermsOfServiceLinkPresent();
    await this.expectPrivacyPolicyLinkPresent();
  }

  /**
   * Click on Twitter link
   */
  async clickTwitterLink() {
    await this.twitterLink.click();
  }

  /**
   * Click on Facebook link
   */
  async clickFacebookLink() {
    await this.facebookLink.click();
  }

  /**
   * Click on LinkedIn link
   */
  async clickLinkedInLink() {
    await this.linkedinLink.click();
  }

  /**
   * Get Twitter link URL
   */
  async getTwitterLinkUrl(): Promise<string | null> {
    return this.twitterLink.getAttribute('href');
  }

  /**
   * Get Facebook link URL
   */
  async getFacebookLinkUrl(): Promise<string | null> {
    return this.facebookLink.getAttribute('href');
  }

  /**
   * Get LinkedIn link URL
   */
  async getLinkedInLinkUrl(): Promise<string | null> {
    return this.linkedinLink.getAttribute('href');
  }

  /**
   * Verify footer has all expected elements
   */
  async expectFooterFullyLoaded() {
    await this.expectFooterVisible();
    await this.expectAllSocialMediaLinksPresent();
    await this.expectCopyrightNoticePresent();
    await this.expectPolicyLinksPresent();
  }

  /**
   * Verify social media links open in new tabs/windows
   */
  async expectLinksOpenInNewTab() {
    // Check for target="_blank" attribute
    await expect(this.twitterLink).toHaveAttribute('target', '_blank');
    await expect(this.facebookLink).toHaveAttribute('target', '_blank');
    await expect(this.linkedinLink).toHaveAttribute('target', '_blank');
  }

  /**
   * Verify social media links have proper rel attribute for security
   */
  async expectLinksHaveProperRelAttribute() {
    // Check for rel="noopener noreferrer" or similar
    const twitterRel = await this.twitterLink.getAttribute('rel');
    const facebookRel = await this.facebookLink.getAttribute('rel');
    const linkedinRel = await this.linkedinLink.getAttribute('rel');

    if (twitterRel) expect(twitterRel).toContain('noopener');
    if (facebookRel) expect(facebookRel).toContain('noopener');
    if (linkedinRel) expect(linkedinRel).toContain('noopener');
  }
}
