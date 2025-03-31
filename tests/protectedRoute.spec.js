import { chromium, expect, test } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

const TENANTS = [process.env.TENANT1_URL, process.env.TENANT2_URL]

const ADMIN_CREDENTIALS = {
    email: process.env.TEST_ADMIN_EMAIL,
    password: process.env.TEST_ADMIN_PASSWORD,
}

const USER_CREDENTIALS = {
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
}

test.describe('ProtectedRoute authentication and access control', () => {
    let browser
    let context

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: true })
    })

    test.beforeEach(async () => {
        context = await browser.newContext()
    })

    test.afterEach(async () => {
        await context.close()
    })

    test.afterAll(async () => {
        await browser.close()
    })

    for (const tenantUrl of TENANTS) {
        test(`Unauthenticated users should be redirected to login - ${tenantUrl}`, async () => {
            const page = await context.newPage()
            const protectedRoutes = [
                `${tenantUrl}/`,
                `${tenantUrl}/about`,
                `${tenantUrl}/contact`,
                `${tenantUrl}/admin`,
            ]
            for (const route of protectedRoutes) {
                await page.goto(route)
                await expect(page).toHaveURL(`${tenantUrl}/login`)
            }
            await page.close()
        })

        test(`Admin users should have access to all routes - ${tenantUrl}`, async () => {
            const page = await context.newPage()
            await page.goto(`${tenantUrl}/login`)
            await page.fill('input[type="email"]', ADMIN_CREDENTIALS.email)
            await page.fill(
                'input[type="password"]',
                ADMIN_CREDENTIALS.password
            )
            await page.click('button:has-text("Sign in")')
            await expect(page).toHaveURL(`${tenantUrl}/`)

            const protectedRoutes = [
                `${tenantUrl}/`,
                `${tenantUrl}/about`,
                `${tenantUrl}/contact`,
                `${tenantUrl}/admin`,
            ]
            for (const route of protectedRoutes) {
                await page.goto(route)
                await expect(page).toHaveURL(route)
            }
            await page.close()
        })

        test(`Regular users should have access to non-admin routes - ${tenantUrl}`, async () => {
            const page = await context.newPage()
            await page.goto(`${tenantUrl}/login`)
            await page.fill('input[type="email"]', USER_CREDENTIALS.email)
            await page.fill('input[type="password"]', USER_CREDENTIALS.password)
            await page.click('button:has-text("Sign in")')
            await expect(page).toHaveURL(`${tenantUrl}/`)

            const userAccessibleRoutes = [
                `${tenantUrl}/`,
                `${tenantUrl}/about`,
                `${tenantUrl}/contact`,
            ]
            for (const route of userAccessibleRoutes) {
                await page.goto(route)
                await expect(page).toHaveURL(route)
            }
            await page.close()
        })

        test(`Regular users should be redirected when accessing admin routes - ${tenantUrl}`, async () => {
            const page = await context.newPage()
            await page.goto(`${tenantUrl}/login`)
            await page.fill('input[type="email"]', USER_CREDENTIALS.email)
            await page.fill('input[type="password"]', USER_CREDENTIALS.password)
            await page.click('button:has-text("Sign in")')
            await expect(page).toHaveURL(`${tenantUrl}/`)

            await page.goto(`${tenantUrl}/admin`)
            await expect(page).toHaveURL(`${tenantUrl}/`)
            await page.close()
        })

        test(`User session should be cleared after logout - ${tenantUrl}`, async () => {
            const page = await context.newPage()
            await page.goto(`${tenantUrl}/login`)
            await page.fill('input[type="email"]', USER_CREDENTIALS.email)
            await page.fill('input[type="password"]', USER_CREDENTIALS.password)
            await page.click('button:has-text("Sign in")')
            await expect(page).toHaveURL(`${tenantUrl}/`)

            await page.evaluate(() => localStorage.clear())
            await page.reload()
            await expect(page).toHaveURL(`${tenantUrl}/login`)
            await page.close()
        })

        test(`Admin session should be cleared after logout - ${tenantUrl}`, async () => {
            const page = await context.newPage()
            await page.goto(`${tenantUrl}/login`)
            await page.fill('input[type="email"]', ADMIN_CREDENTIALS.email)
            await page.fill(
                'input[type="password"]',
                ADMIN_CREDENTIALS.password
            )
            await page.click('button:has-text("Sign in")')
            await expect(page).toHaveURL(`${tenantUrl}/`)

            await page.evaluate(() => localStorage.clear())
            await page.reload()
            await expect(page).toHaveURL(`${tenantUrl}/login`)
            await page.close()
        })
    }
})
