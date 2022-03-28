# OpenMFE DOM Checker


This tool checks if an OpenMFE microfrontend is compliant with the specification and its own contract at runtime. It starts a headless browser and observes the microfrontend’s behaviour in the DOM tree. It also checks that the prerendering endpoint generates spec-compliant and valid HTML output.

To test a microfrontend, you need to install this tool as a library and then run it as follows:

```
npx openmfe-check-runtime <manifest url>
```

NOTE: This tool is based on Puppeteer, which in turn uses Google Chromium. If you use this tool on a machine that has Chrome installed, you can install this tool without Chrome using the `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` flag:


```shell
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm i @openmfe/check-runtime
PUPPETEER_EXECUTABLE_PATH=<path to Chrome/Chromium> npx openmfe-check-runtime <manifest url>
```

If you use this regularily, it might be a good idea to add the `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` and `PUPPETEER_EXECUTABLE_PATH` variables to your shell environment, e.g. the `~/.bashrc` file (will only work after opening a new shell).
