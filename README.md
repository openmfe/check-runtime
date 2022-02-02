# OpenMFE DOM Checker


This tool checks if an OpenMFE microfrontend is compliant with the specification and its own contract at runtime. It starts a headless browser and observes the microfrontend’s behaviour in the DOM tree. It also checks that the prerendering endpoint generates spec-compliant and valid HTML output.

To test a microfrontend, you need to install this tool as a library and then run it as follows:

```
npx openmfe-check-dom <manifest url>
```
