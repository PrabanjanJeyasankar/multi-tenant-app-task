import { expect, test } from '@playwright/test'
import 'dotenv/config'
import fs from 'fs'

const testCases = JSON.parse(
    fs.readFileSync('./tests/data/navigationLayout.json', 'utf-8')
)

const loginToTenant = async (page, tenant) => {
    console.log(`Logging into ${tenant.name}...`)
    await page.goto(tenant.url)

    await page.fill('input[name="email"]', process.env.TEST_EMAIL)
    await page.fill('input[name="password"]', process.env.TEST_PASSWORD)
    await page.click('button[type="submit"]')

    await page.waitForLoadState('networkidle')
}

test.describe('Multi-Tenant Navigation Layout Tests', () => {
    let page

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage()
    })

    test.afterEach(async () => {
        await page.close()
    })

    testCases.forEach((tenant) => {
        test(`Navigation Layout Test for ${tenant.name}`, async () => {
            await loginToTenant(page, tenant)

            console.log(`Verifying navigation layout for ${tenant.name}...`)
            const navigationBar = page.locator(tenant.navId)
            const box = await navigationBar.boundingBox()

            expect(box).not.toBeNull()
            if (tenant.axis === 'x') {
                expect(box.x).toBeLessThan(50)
            } else {
                expect(box.y).toBeLessThan(50)
            }
        })
    })
})
