import fetch from 'node-fetch'
import { HtmlValidate } from 'html-validate'

export default async function(env, manifest) {
    const page = await env.createPage()

    const url = `${manifest.url.prerender}?${new URLSearchParams(manifest.examples[0].attributes)}`
    const skeleton = await (await fetch(url)).text()

    const dom = await page.evaluate(async (manifest, skeleton) => {
        const elem = document.createElement(manifest.tag)
        elem.innerHTML = skeleton
        document.body.appendChild(elem)
        return document.documentElement.outerHTML
    }, manifest, skeleton)

    const validator = new HtmlValidate({
        "extends": ["html-validate:recommended"],
        "rules": {
            "close-order": "error",
            "no-style-tag": "error",
            "no-inline-style": "off",
            "svg-focusable": "off"
        }
    })

    const content = await page.content()
    const report = validator.validateString(content)

    if (report.valid !== true) {
        console.error('× The prerendered HTML is invalid.', JSON.stringify(report, null, 4))
    } else {
        console.log('✓ The prerendered HTML is valid.')
    }
}
