# Simple Analytics Gatsby Plugin

Privacy friendly analytics without cookies and needed consent.

Install with `npm install gatsby-plugin-simple-analytics --save-dev`.

## What does it do

It tracks page views with support for `pushState` navigation. It sends the data to [Simple Analytics](https://simpleanalytics.com) and it will be available in your dashboard. You need to have a paid subscription for it to work.

## How to use

1. Add our plugin to `gatsby-config.js`

   ```js
   plugins: ['gatsby-plugin-simple-analytics']
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
