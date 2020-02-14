# Simple Analytics Gatsby Plugin

[Simple Analytics](https://simpleanalytics.com) is a clean, simple, and privacy friendly analytics tool. Actionable data in a beautiful dashboard. It does [not use cookies](https://docs.simpleanalytics.com/what-we-collect) and you can [bypass ad blockers](https://docs.simpleanalytics.com/bypass-ad-blockers). Make sure [to signup](https://simpleanalytics.com) to get most value out of this plugin.

## Install

Run the following command:

```bash
npm install gatsby-plugin-simple-analytics --save-dev
```

## What does it do

It tracks page views with support for `pushState` navigation. It sends the data to [Simple Analytics](https://simpleanalytics.com) and it will be available in your dashboard. You need to have a paid subscription for it to work.

## How to use

1. Add our plugin to `gatsby-config.js`

   ```js
   plugins: [    
     {
       resolve: 'simple-analytics-gatsby-plugin',
       options: {
         trackPageViews: true
       }
     }
   ]
   ```

1. If you want to set a custom domain, use this config:

   ```js
    plugins: [    
      {
        resolve: 'simple-analytics-gatsby-plugin',
        options: {
          eventsGlobal: 'sa',
          events: true,
          trackPageViews: true,
          ignorePages: ['pathname']
        }
      }
    ]
   ```

   [Read our docs](https://docs.simpleanalytics.com/bypass-ad-blockers) on the custom domain feature.

## Use with Metomic

[Metomic](https://metomic.io/) provides a privacy-by-design API to ethically manage your users' data. It's pretty cool.

If you want to use it with Metomic's `data-micropolicy` use this config:

```js
plugins: [
  {
    resolve: 'gatsby-plugin-simple-analytics',
    options: {
      metomic: 'POLICY-SLUG'
    }
  }
]
```

It will result in something like this:

```html
<script src="https://scripts.simpleanalyticscdn.com/latest.js" async="" defer="" type="text/x-metomic" data-micropolicy="POLICY-SLUG">
```

## Contribute

If you know how to improve this plugin, please submit a PR, we are usually fast with merging it.
