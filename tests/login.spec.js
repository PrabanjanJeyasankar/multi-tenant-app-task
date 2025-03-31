import 'dotenv/config'
import { chromium } from 'playwright'
import { expect, test } from 'playwright-test-coverage'
import { hexToRgb } from './utils/colorUtils'
import { config } from './utils/tenantUtils.js'

test.describe('Login Page Tests', () => {
    let browser
    let tenants = [
        { id: process.env.TENANT1_ID, url: process.env.TENANT1_URL },
        { id: process.env.TENANT2_ID, url: process.env.TENANT2_URL },
    ]

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: true })
    })

    for (const tenant of tenants) {
        test.describe(`Tests for ${tenant.id}`, () => {
            let context, page

            test.beforeEach(async () => {
                context = await browser.newContext()
                page = await context.newPage()
                await page.goto(tenant.url, { waitUntil: 'domcontentloaded' })
            })

            test.afterEach(async () => {
                await context.close()
            })

            test('Verify login page UI', async () => {
                await expect(page.locator('img')).toHaveAttribute(
                    'src',
                    config.tenants[tenant.id].logo
                )
                await expect(page.locator('h2')).toContainText(
                    config.tenants[tenant.id].name
                )
                await expect(page.locator('button')).toHaveCSS(
                    'background-color',
                    hexToRgb(config.tenants[tenant.id].theme.primary)
                )
            })

            test('Verify error messages for empty login fields', async () => {
                await page.click('button:has-text("Sign in")')
                await expect(
                    page.locator('#email ~ p.text-red-500')
                ).toHaveText('Email is required.')
                await expect(
                    page.locator('#password ~ p.text-red-500')
                ).toHaveText('Password is required.')
            })

            test('Verify invalid email format', async () => {
                await page.fill('#email', 'invalidemail')
                await page.click('button:has-text("Sign in")')
                await expect(
                    page.locator('#email ~ p.text-red-500')
                ).toHaveText('* Please enter a valid email address.')
            })

            test('Verify short password validation', async () => {
                await page.fill('#email', 'test@example.com')
                await page.fill('#password', '123')
                await page.click('button:has-text("Sign in")')
                await expect(
                    page.locator('#password ~ p.text-red-500')
                ).toHaveText('* Password must be at least 6 characters.')
            })

            test('Verify login with incorrect credentials', async () => {
                await page.fill('#email', 'wrong@example.com')
                await page.fill('#password', 'wrongpassword')
                await page.click('button:has-text("Sign in")')
                await expect(page.locator('.bg-red-100')).toHaveText(
                    /Invalid email or password.|Something went wrong. Please try again./
                )
            })

            test('Verify successful login', async () => {
                await page.fill('#email', process.env.TEST_EMAIL)
                await page.fill('#password', process.env.TEST_PASSWORD)
                await page.click('button:has-text("Sign in")')
                await expect(page).toHaveURL(tenant.url)
            })

            test('Verify session persistence after login', async () => {
                await page.fill('#email', process.env.TEST_EMAIL)
                await page.fill('#password', process.env.TEST_PASSWORD)
                await page.click('button:has-text("Sign in")')

                await context.storageState({ path: `auth-${tenant.id}.json` })

                const newContext = await browser.newContext({
                    storageState: `auth-${tenant.id}.json`,
                })
                const newPage = await newContext.newPage()
                await newPage.goto(tenant.url)

                await expect(newPage).not.toHaveURL(tenant.url + '/login')
                await newContext.close()
            })

            test('Verify session expiration after logout', async () => {
                await page.fill('#email', process.env.TEST_EMAIL)
                await page.fill('#password', process.env.TEST_PASSWORD)
                await page.click('button:has-text("Sign in")')

                await page.click('button:has-text("Logout")')
                await expect(page).toHaveURL(tenant.url + '/login')

                const newContext = await browser.newContext()
                const newPage = await newContext.newPage()
                await newPage.goto(tenant.url)

                await expect(newPage).toHaveURL(tenant.url + '/login')
            })
        })
    }

    test.afterAll(async () => {
        await browser.close()
    })
})
