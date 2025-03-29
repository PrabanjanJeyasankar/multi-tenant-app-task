import { chromium, expect, test } from '@playwright/test'
import 'dotenv/config'

const TEST_EMAIL = process.env.TEST_EMAIL
const TEST_PASSWORD = process.env.TEST_PASSWORD

test.describe('Side Navigation Bar Tests for Tenant 1', () => {
    let browser
    let page

    test.beforeEach(async () => {
        browser = await chromium.launch({
            headless: false,
        })
        page = await browser.newPage()
        await page.goto('https://tenant1-uxmint.web.app/login')

        await page.fill('input[name="email"]', TEST_EMAIL)
        await page.fill('input[name="password"]', TEST_PASSWORD)
        await page.click('button[type="submit"]')
    })

    test.afterEach(async () => {
        await browser.close()
    })

    test('Side navigation bar should be visible', async () => {
        const sideNavigationBar = page.locator('#sideNavigationBar')
        await expect(sideNavigationBar).toBeVisible()
    })

    test('Logo should match tenant_1_logo in side navigation', async () => {
        const logo = page.locator('#sideNavigationBar img')
        await expect(logo).toBeVisible()

        const logoSrc = await logo.getAttribute('src')
        expect(logoSrc).toContain('tenant_1_logo')
    })

    test('Navigation links in side navigation should be visible', async () => {
        const links = ['Dashboard', 'About', 'Contact']
        for (const link of links) {
            await expect(page.getByRole('link', { name: link })).toBeVisible()
        }
    })

    test('Admin panel link should be visible for admin users', async () => {
        const adminLink = page.locator('text=Admin Panel')
        if ((await adminLink.count()) > 0) {
            await expect(adminLink).toBeVisible()
        }
    })

    test('Logout button in side navigation should be visible and functional', async () => {
        const logoutButton = page.locator('text=Logout')
        await expect(logoutButton).toBeVisible()

        await page.click('text=Logout')
        await expect(page).toHaveURL('https://tenant1-uxmint.web.app/login')

        await expect(page.locator('input[name="email"]')).toBeVisible()
        await expect(page.locator('input[name="password"]')).toBeVisible()
        await expect(page.locator('button[type="submit"]')).toBeVisible()
    })
})
