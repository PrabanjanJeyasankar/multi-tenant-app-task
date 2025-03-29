import { chromium, expect, test } from '@playwright/test'
import 'dotenv/config'

const TEST_EMAIL = process.env.TEST_EMAIL
const TEST_PASSWORD = process.env.TEST_PASSWORD

test.describe('Navigation bar position test based on subdomain', () => {
    test('Test navigation bar position to be on Side for Tenant 1', async () => {
        const browser = await chromium.launch({
            headless: false,
            slowMo: 2000,
        })

        const page = await browser.newPage()

        await page.goto('https://tenant1-uxmint.web.app/login')

        await page.fill('input[name = "email"]', TEST_EMAIL)
        await page.fill('input[name = "password"]', TEST_PASSWORD)
        await page.click('button[type="submit"]')

        const navigationBar = page.locator('#sideNavigationBar')
        const box = await navigationBar.boundingBox()

        if (box) {
            expect(box.x).toBeLessThan(50)
        }

        await browser.close()
    })

    test('Test navigation bar position to be on Top for Tenant 2', async () => {
        const browser = await chromium.launch({
            headless: false,
        })

        const page = await browser.newPage()

        await page.goto('https://tenant2-uxmint.web.app/login')

        await page.fill('input[name = "email"]', TEST_EMAIL)
        await page.fill('input[name = "password"]', TEST_PASSWORD)
        await page.click('button[type="submit"]')

        const navigationBar = page.locator('#topNavigationBar')
        const box = await navigationBar.boundingBox()

        if (box) {
            expect(box.y).toBeLessThan(50)
        }

        await browser.close()
    })
})
