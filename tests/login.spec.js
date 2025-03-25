import dotenv from 'dotenv'
import { expect, test } from 'playwright-test-coverage'

dotenv.config()

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.waitForFunction(() => navigator.onLine)
        await page.goto('http://localhost:5173/login', {
            waitUntil: 'domcontentloaded',
        })
    })

    test('renders login page with logo and title', async ({ page }) => {
        await expect(page.locator('img')).toBeVisible()
        await expect(page.locator('h2')).toHaveText(/Sign in to .+/)
    })

    test('displays correct tenant logo and name', async ({ page }) => {
        const logo = page.locator('img')
        await expect(logo).toHaveAttribute('src', '/tenant_1_logo.svg')
        await expect(page.locator('h2')).toContainText('Tenant 1')
    })

    test('validates empty email and password fields', async ({ page }) => {
        await page.click('button:has-text("Sign in")')

        await expect(page.locator('#email ~ p.text-red-500')).toHaveText(
            'Email is required.'
        )
        await expect(page.locator('#password ~ p.text-red-500')).toHaveText(
            'Password is required.'
        )
    })

    test('shows error for invalid email format', async ({ page }) => {
        await page.fill('#email', 'invalidemail')
        await page.click('button:has-text("Sign in")')

        await expect(page.locator('#email ~ p.text-red-500')).toHaveText(
            '* Please enter a valid email address.'
        )
    })

    test('shows error if password is too short', async ({ page }) => {
        await page.fill('#email', 'test@example.com')
        await page.fill('#password', '123')
        await page.click('button:has-text("Sign in")')

        await expect(page.locator('#password ~ p.text-red-500')).toHaveText(
            '* Password must be at least 6 characters.'
        )
    })

    test('logs in successfully and redirects to homepage', async ({ page }) => {
        const email = process.env.TEST_EMAIL
        const password = process.env.TEST_PASSWORD

        await page.fill('#email', email)
        await page.fill('#password', password)
        await page.click('button:has-text("Sign in")')

        await expect(page).toHaveURL('/')
    })

    test('displays error message when login fails', async ({ page }) => {
        await page.fill('#email', 'wrong@example.com')
        await page.fill('#password', 'wrongpassword')
        await page.click('button:has-text("Sign in")')

        await expect(page.locator('.bg-red-100')).toHaveText(
            'Invalid email or password.'
        )
    })
})
