import { chromium, expect, test } from '@playwright/test'
import 'dotenv/config'

const TEST_EMAIL = process.env.TEST_EMAIL
const TEST_PASSWORD = process.env.TEST_PASSWORD
const TENANT_URL = process.env.TENANT2_URL

test.describe('Top Navigation Bar Validation for Tenant 2', () => {
    test('Login and navigation validation', async () => {
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()

        await page.goto(TENANT_URL)
        await page.fill('input[name="email"]', TEST_EMAIL)
        await page.fill('input[name="password"]', TEST_PASSWORD)
        await page.click('button[type="submit"]')

        await expect(page).toHaveURL(`${TENANT_URL}/`)

        const navigationBar = page.locator('#topNavigationBar')
        await expect(navigationBar).toBeVisible()

        await browser.close()
    })

    test('Logo Validation for top navigation bar', async () => {
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()

        await page.goto(TENANT_URL)
        await page.fill('input[name="email"]', TEST_EMAIL)
        await page.fill('input[name="password"]', TEST_PASSWORD)
        await page.click('button[type="submit"]')

        const logo = page.locator('#topNavigationBar img')
        await expect(logo).toBeVisible()
        await expect(logo).toHaveAttribute('src', /tenant_2_logo/)

        await browser.close()
    })

    test('Navigation links validation for top navigation bar', async () => {
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()

        await page.goto(TENANT_URL)
        await page.fill('input[name="email"]', TEST_EMAIL)
        await page.fill('input[name="password"]', TEST_PASSWORD)
        await page.click('button[type="submit"]')

        const navLinks = ['Dashboard', 'About', 'Contact']
        for (const link of navLinks) {
            await expect(page.getByRole('link', { name: link })).toBeVisible()
        }

        await browser.close()
    })

    test('Admin panel visibility validation for top navigation bar', async () => {
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()

        await page.goto(TENANT_URL)
        await page.fill('input[name="email"]', TEST_EMAIL)
        await page.fill('input[name="password"]', TEST_PASSWORD)
        await page.click('button[type="submit"]')

        const adminLink = page.locator('text=Admin Panel')
        if (await adminLink.count()) {
            await expect(adminLink).toBeVisible()
        }

        await browser.close()
    })


    test('Logout functionality for top navigation bar', async () => {
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()

        await page.goto(TENANT_URL)
        await page.fill('input[name="email"]', TEST_EMAIL)
        await page.fill('input[name="password"]', TEST_PASSWORD)
        await page.click('button[type="submit"]')

        const logoutButton = page.locator('text=Logout')
        await expect(logoutButton).toBeVisible()
        await logoutButton.click()

        await expect(page).toHaveURL(`${TENANT_URL}/login`)
        await expect(page.locator('input[name="email"]')).toBeVisible()
        await expect(page.locator('input[name="password"]')).toBeVisible()
        await expect(page.locator('button[type="submit"]')).toBeVisible()

        await browser.close()
    })
})
