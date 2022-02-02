#!/usr/bin/env node

// TODO: perform additional DOM checks:
// - is this really a web component?
// - does it have shadow DOM?
// - are font names prefixed?

// check prerender:
// - only one element
// - no styles or links
// - no scripts
// - valid HTML


import * as fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import getManifest from 'openmfe-manifest'

// checks
import Environment from '../lib/environment.js'
import checkDomUnmodified from '../lib/dom-unmodified.js'
import checkPrerenderValid from '../lib/valid-prerender.js'

;(async () => {
    const manifestUrl = process.argv[2]

    if (!manifestUrl)
        throw new Error("An URL to the manifest file must be provided.")

    const manifest = getManifest(await fetch(manifestUrl).then(data => data.text()), manifestUrl)

    const env = new Environment()
    await env.init()

    try {
        await checkDomUnmodified(env, manifest)
        await checkPrerenderValid(env, manifest)
    } catch (e) {
        console.error(e.message)
    }

    await env.shutdown()
})()
