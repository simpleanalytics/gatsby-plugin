const React = require('react')

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const domain = pluginOptions.domain || 'cdn.simpleanalytics.io'
  const scriptName = domain === 'cdn.simpleanalytics.io' ? 'hello.js' : 'app.js'
  const scriptUrl = `https://${domain}/${scriptName}`

  setHeadComponents([
    <script
      key="plugin-simpleanalytics"
      src={scriptUrl}
      async
      defer
    />
  ])
}
