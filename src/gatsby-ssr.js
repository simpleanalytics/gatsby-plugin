const React = require('react')

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const domain = pluginOptions.domain || 'cdn.simpleanalytics.io'
  const scriptName = domain === 'cdn.simpleanalytics.io' ? 'hello.js' : 'app.js'
  const scriptUrl = `https://${domain}/${scriptName}`

  const options = {
    key: 'plugin-simpleanalytics',
    src: scriptUrl,
    async: true,
    defer: true
  }

  if (pluginOptions.metomic) {
    options.type = 'text/x-metomic'
    options['data-micropolicy'] = pluginOptions.metomic
  }

  setHeadComponents([
    React.createElement('script', options)
  ])
}
