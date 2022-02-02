import * as fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
const __dirname = dirname(fileURLToPath(import.meta.url))

// allows reusing the browser instance
let browser

export default class {
    async init() {
        this._browser = this._browser || await puppeteer.launch()
        this._content = this._content || fs.readFileSync(`${__dirname}/dom-unmodified-sample.html`).toString()
    }

    async createPage() {
        const page = await this._browser.newPage()
        await page.setContent(this._content)

        if (process.env.DEBUG) {
            // logging as per https://stackoverflow.com/a/59919144/3908235
            page
                .on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
                .on('pageerror', ({ message }) => console.error(message))
                .on('response', response => console.log(`${response.status()} ${response.url()}`))
                .on('requestfailed', request => console.error(`${request.failure().errorText} ${request.url()}`))
        }

        return page
    }

    async shutdown() {
        await this._browser.close()
    }
}
