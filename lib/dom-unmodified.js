export default async function(env, manifest) {
    const page = await env.createPage()

    const results = await page.evaluate(async (manifest) => {
        const elem = document.createElement(manifest.tag)
        const script = document.createElement("script")
        script.src = manifest.url.frontend

        Object.entries(manifest.examples[0].attributes)
            .forEach(([key, value]) => elem.setAttribute(key, value))

        const origDOM = document.documentElement.outerHTML

        document.body.appendChild(elem)
        document.body.appendChild(script)

        // wait for rendering/loading to finish
        await new Promise(r => setTimeout(r, 2000))

        const results = {
            foundLinks: document.querySelectorAll('link').length,
            foundEmbeddedStylesheets: document.querySelectorAll('style').length,
            foundExtraScripts: document.querySelectorAll('script').length - 1
        }

        document.body.removeChild(elem)
        document.body.removeChild(script)

        const finalDOM = document.documentElement.outerHTML

        return {
            ...results,
            domManipulated : origDOM !== finalDOM
        }
    }, manifest)

    if (Object.values(results).filter(x => x).length !== 0) {
        console.error('× Incompliant DOM tree manipulation detected.', results)
    } else {
        console.log('✓ No incompliant manipulations detected.')
    }
}
