import 'dotenv/config'
import { expect, test } from 'playwright-test-coverage'
import { hexToRgb } from './utils/colorUtils'
import { config } from './utils/tenantUtils.js'

const TENANT1_URL = process.env.TENANT1_URL
const TENANT2_URL = process.env.TENANT2_URL

const TENANT1_ID = process.env.TENANT1_ID
const TENANT2_ID = process.env.TENANT2_ID

test.describe('Login Page', () => {
    test.describe('Login Page for tenant1', () => {
        test.beforeEach(async ({ page }) => {
            await page.waitForFunction(() => navigator.onLine)
            await page.goto(TENANT1_URL, {
                waitUntil: 'domcontentloaded',
            })
        })

        // Image and Heading (common test case)
        test('renders login page with logo and title', async ({ page }) => {
            await expect(page.locator('img')).toBeVisible()
            await expect(page.locator('h2')).toHaveText(/Sign in to .+/)
        })

        // Logo and Heading (conditional test case)
        test('displays correct tenant logo and name', async ({ page }) => {
            const tenantLogoSrc = config.tenants[TENANT1_ID].logo
            const tenantName = config.tenants[TENANT1_ID].name

            const logoElement = page.locator('img')

            await expect(logoElement).toHaveAttribute('src', tenantLogoSrc)

            await expect(page.locator('h2')).toContainText(tenantName)
        })

        // Button color (conditional test case)
        test('checks button CSS properties', async ({ page }) => {
            const primaryColor = config.tenants[TENANT1_ID].theme.primary

            const button = page.locator('button')

            await expect(button).toHaveCSS(
                'background-color',
                hexToRgb(primaryColor)
            )
        })

        // Validation checking (common test case)
        test('validates empty email and password fields', async ({ page }) => {
            await page.click('button:has-text("Sign in")')

            await expect(page.locator('#email ~ p.text-red-500')).toHaveText(
                'Email is required.'
            )
            await expect(page.locator('#password ~ p.text-red-500')).toHaveText(
                'Password is required.'
            )
        })

        // Error Handling (common test case)
        test('shows error for invalid email format', async ({ page }) => {
            await page.fill('#email', 'invalidemail')
            await page.click('button:has-text("Sign in")')

            await expect(page.locator('#email ~ p.text-red-500')).toHaveText(
                '* Please enter a valid email address.'
            )
        })

        // Error Warning Text (common test case)
        test('shows error if password is too short', async ({ page }) => {
            await page.fill('#email', 'test@example.com')
            await page.fill('#password', '123')
            await page.click('button:has-text("Sign in")')

            await expect(page.locator('#password ~ p.text-red-500')).toHaveText(
                '* Password must be at least 6 characters.'
            )
        })

        // Successful login (conditional test case)
        test('logs in successfully and redirects to homepage', async ({
            page,
        }) => {
            const email = process.env.TEST_EMAIL
            const password = process.env.TEST_PASSWORD

            await page.fill('#email', email)
            await page.fill('#password', password)
            await page.click('button:has-text("Sign in")')

            await expect(page).toHaveURL(TENANT1_URL)
        })

        // Invalid login (common test case)
        test('displays error message when login fails', async ({ page }) => {
            await page.fill('#email', 'wrong@example.com')
            await page.fill('#password', 'wrongpassword')
            await page.click('button:has-text("Sign in")')

            const possibleMessages = [
                'Invalid email or password.',
                'Something went wrong. Please try again.',
            ]

            await expect(page.locator('.bg-red-100')).toHaveText(
                new RegExp(possibleMessages.join('|'))
            )
        })
    })
    test.describe('Login Page for tenant2', () => {
        test.beforeEach(async ({ page }) => {
            await page.waitForFunction(() => navigator.onLine)
            await page.goto(TENANT2_URL, {
                waitUntil: 'domcontentloaded',
            })
        })

        // Image and Heading (common test case)
        test('renders login page with logo and title', async ({ page }) => {
            await expect(page.locator('img')).toBeVisible()
            await expect(page.locator('h2')).toHaveText(/Sign in to .+/)
        })

        // Logo and Heading (conditional test case)
        test('displays correct tenant logo and name', async ({ page }) => {
            const tenantLogoSrc = config.tenants[TENANT2_ID].logo
            const tenantName = config.tenants[TENANT2_ID].name

            const logoElement = page.locator('img')

            await expect(logoElement).toHaveAttribute('src', tenantLogoSrc)

            await expect(page.locator('h2')).toContainText(tenantName)
        })

        // Button color (conditional test case)
        test('checks button CSS properties', async ({ page }) => {
            const primaryColor = config.tenants[TENANT2_ID].theme.primary

            const button = page.locator('button')

            await expect(button).toHaveCSS(
                'background-color',
                hexToRgb(primaryColor)
            )
        })

        // Validation checking (common test case)
        test('validates empty email and password fields', async ({ page }) => {
            await page.click('button:has-text("Sign in")')

            await expect(page.locator('#email ~ p.text-red-500')).toHaveText(
                'Email is required.'
            )
            await expect(page.locator('#password ~ p.text-red-500')).toHaveText(
                'Password is required.'
            )
        })

        // Error Handling (common test case)
        test('shows error for invalid email format', async ({ page }) => {
            await page.fill('#email', 'invalidemail')
            await page.click('button:has-text("Sign in")')

            await expect(page.locator('#email ~ p.text-red-500')).toHaveText(
                '* Please enter a valid email address.'
            )
        })

        // Error Warning Text (common test case)
        test('shows error if password is too short', async ({ page }) => {
            await page.fill('#email', 'test@example.com')
            await page.fill('#password', '123')
            await page.click('button:has-text("Sign in")')

            await expect(page.locator('#password ~ p.text-red-500')).toHaveText(
                '* Password must be at least 6 characters.'
            )
        })

        // Successful login (conditional test case)
        test('logs in successfully and redirects to homepage', async ({
            page,
        }) => {
            const email = process.env.TEST_EMAIL
            const password = process.env.TEST_PASSWORD

            await page.fill('#email', email)
            await page.fill('#password', password)
            await page.click('button:has-text("Sign in")')

            await expect(page).toHaveURL(TENANT2_URL)
        })

        // Invalid login (common test case)
        test('displays error message when login fails', async ({ page }) => {
            await page.fill('#email', 'wrong@example.com')
            await page.fill('#password', 'wrongpassword')
            await page.click('button:has-text("Sign in")')

            const possibleMessages = [
                'Invalid email or password.',
                'Something went wrong. Please try again.',
            ]

            await expect(page.locator('.bg-red-100')).toHaveText(
                new RegExp(possibleMessages.join('|'))
            )
        })
    })
})
