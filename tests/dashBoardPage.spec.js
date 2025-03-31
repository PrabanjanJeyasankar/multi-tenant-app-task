import { chromium, expect, test } from '@playwright/test'
import 'dotenv/config'

import fs from 'fs'

const tenants = JSON.parse(
    fs.readFileSync('./tests/data/dashBoardPage.json', 'utf-8')
)

const TEST_ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL
const TEST_ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD
const TEST_USER_EMAIL = process.env.TEST_EMAIL
const TEST_USER_PASSWORD = process.env.TEST_PASSWORD

test.describe('Dashboard Page Tests for Tenants', () => {
    let browser

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: true })
    })

    test.afterAll(async () => {
        await browser.close()
    })

    for (const tenant of tenants) {
        test.describe(`Dashboard tests for ${tenant.name}`, () => {
            let context
            let page

            test.beforeEach(async () => {
                context = await browser.newContext()
                page = await context.newPage()
                await context.clearCookies()
                await page.goto(`${tenant.url}/login`)
            })

            test.afterEach(async () => {
                await context.close()
            })

            test(`Admin login and dashboard verification - ${tenant.name}`, async () => {
                await login(
                    page,
                    TEST_ADMIN_EMAIL,
                    TEST_ADMIN_PASSWORD,
                    tenant.url
                )
                await verifyAdminDashboard(page)
                await logout(page, tenant.url)
            })

            test(`User login and dashboard verification - ${tenant.name}`, async () => {
                await login(
                    page,
                    TEST_USER_EMAIL,
                    TEST_USER_PASSWORD,
                    tenant.url
                )
                await verifyUserDashboard(page)
                await logout(page, tenant.url)
            })
        })
    }
})

async function login(page, email, password, tenantUrl) {
    await page.fill('input[name="email"]', email)
    await page.fill('input[name="password"]', password)
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(tenantUrl)
}

async function verifyAdminDashboard(page) {
    await expect(page.locator('h1')).toHaveText('Dashboard')
    const adminCards = page.locator('h3')
    await expect(adminCards).toHaveCount(2)
    await expect(adminCards.nth(0)).toHaveText('Card 1: Admin Access')
    await expect(adminCards.nth(1)).toHaveText('Card 2: Admin Access')
}

async function verifyUserDashboard(page) {
    await expect(page.locator('h1')).toHaveText('Dashboard')
    await expect(page.locator('h3')).toHaveText('User Card')
}

async function logout(page, tenantUrl) {
    await page.click('text=Logout')
    await expect(page).toHaveURL(`${tenantUrl}/login`)
}
