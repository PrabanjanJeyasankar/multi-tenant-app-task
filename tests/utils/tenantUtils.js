import path from 'path'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const jsonPath = path.resolve(__dirname, '../../public/config/tenants.json')

export const config = JSON.parse(readFileSync(jsonPath, 'utf-8'))
