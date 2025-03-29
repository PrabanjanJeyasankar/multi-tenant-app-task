import { chromium, expect, test } from '@playwright/test'
import 'dotenv/config'

const TEST_EMAIL = process.env.TEST_EMAIL
const TEST_PASSWORD = process.env.TEST_PASSWORD

test.describe('Top Navigation Bar Tests for Tenant 2', () => {
    let browser
    let page

    test.beforeEach(async () => {
        browser = await chromium.launch({
            headless: false,
        })
        page = await browser.newPage()
        await page.goto('https://tenant2-uxmint.web.app/login')

        await page.fill('input[name="email"]', TEST_EMAIL)
        await page.fill('input[name="password"]', TEST_PASSWORD)
        await page.click('button[type="submit"]')
    })

    test.afterEach(async () => {
        await browser.close()
    })

    test('Navigation bar should be visible and positioned at the top', async () => {
        const navigationBar = page.locator('#topNavigationBar')
        await expect(navigationBar).toBeVisible()

        const box = await navigationBar.boundingBox()
        if (box) {
            expect(box.y).toBeLessThan(50)
        }
    })

    test('Logo should match tenant_2_logo', async () => {
        const logo = page.locator('#topNavigationBar img')
        await expect(logo).toBeVisible()

        const logoSrc = await logo.getAttribute('src')
        expect(logoSrc).toContain('tenant_2_logo')
    })

    test('Navigation links should be visible', async () => {
        const links = ['Dashboard', 'About', 'Contact']
        for (const link of links) {
            await expect(page.getByRole('link', { name: link })).toBeVisible()
        }
    })

    test('Logout button should be visible', async () => {
        const logoutButton = page.locator('text=Logout')
        await expect(logoutButton).toBeVisible()
    })

    test('Page title should include "Tenant 2"', async () => {
        await expect(page).toHaveTitle(/Tenant 2/)
    })

    test('Favicon should match tenant_2_logo', async () => {
        const faviconHref = await page
            .locator('link[rel="icon"]')
            .getAttribute('href')
        expect(faviconHref).toContain('tenant_2_logo')
    })

    test('User should be able to log out successfully', async () => {
        await page.click('text=Logout')

        await expect(page).toHaveURL('https://tenant2-uxmint.web.app/login')

        await expect(page.locator('input[name="email"]')).toBeVisible()
        await expect(page.locator('input[name="password"]')).toBeVisible()
        await expect(page.locator('button[type="submit"]')).toBeVisible()
    })
})
