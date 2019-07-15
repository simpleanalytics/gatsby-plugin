# Simple Analytics Gatsby Plugin

Install with `npm install gatsby-plugin-simple-analytics`

## How to use

1. Add our plugin to `gatsby-config.js`

    ```js
    plugins: [
      'gatsby-plugin-simple-analytics'
    ]
    ```

1. If you want to set a custom domain, use this config:

    ```js
    plugins: [
      {
        resolve: 'gatsby-plugin-simple-analytics',
        options: {
          // Optional custom domain
          domain: 'your.custom.domain'
        }
      }
    ]
    ```

    [Read our docs](https://docs.simpleanalytics.com/bypass-ad-blockers) on the custom domain feature.

## Contribute

If you know how to improve this plugin, please submit a PR, we are usually fast with merging it.
