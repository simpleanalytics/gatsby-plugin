const React = require('react')

const defaultDomain = 'scripts.simpleanalyticscdn.com'

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const domain = pluginOptions.domain || defaultDomain
  let scriptName
  if (pluginOptions.scriptName) {
    scriptName = pluginOptions.scriptName
  } else {
    scriptName = 'latest.js'
  }
  const scriptUrl = `https://${domain}/${scriptName}`

  const options = {
    src: scriptUrl,
    async: true,
    type: 'text/javascript'
  }

  if (pluginOptions.metomic) {
    options.metomic = pluginOptions.metomic
  }
  if (pluginOptions.trackEvents) {
    options.eventsGlobal = pluginOptions.eventsGlobal
  }

  setHeadComponents([
    React.createElement('script', {
      id: 'simple-analytics-loader',
      key: 'plugin-simpleanalytics',
      type: options.metomic ? 'text/x-metomic' : 'text/javascript',
      ['data-micropolicy']: options.metomic,
      ['data-sa-global']: options.eventsGlobal,
      ['data-loaded']: false,
      dangerouslySetInnerHTML: {
        __html: loadScript(domain, options)
      }
    })
  ])
}

// this script runs when the page loads, it does the following;
// 1. Checks the doNotTrack option, and if set then it aborts and does nothing
// 2. Creates a script tag for the Simple Analytics script
// 3. Sets all the options properties on the script tag
// 4. Inserts the script tag before the first other script in the document
const loadScript = (domain, options) => {
  return `!(function(s, i, m, p, l, e) {
    const parent = document.querySelector('#simple-analytics-loader');
    if (!parent) return;
    const dnt = s.doNotTrack || m.doNotTrack || m.msDoNotTrack;
    if (/yes|1/.test(dnt) && parent) {
      parent.setAttribute('data-enabled', false);
      return console.warn('Simple Analytics: Not loading script when doNotTrack is enabled');
    }
    l = i.createElement(p);
    l.addEventListener('load', function() {
      if (parent) {
      parent.setAttribute('data-loaded', true);
        let event;
        if (typeof Event === 'function') {
          event = new Event('script-loaded');
        } else {
          event = document.createEvent('Event');
          event.initEvent('script-loaded', true, true);
        }
        parent.dispatchEvent(event);
      }
    }, false)
    l.async = "true";
    l.src="${options.src}";
    l.type="text/javascript";
    l.setAttribute('id', 'simple-analytics');
    ${
      options.eventsGlobal
        ? `l.setAttribute("data-sa-global", "${options.eventsGlobal}")`
        : ''
    }
    e = i.getElementsByTagName(p)[0];
    e.parentNode.insertBefore(l, e);
  })(
    window,
    document,
    navigator,
    'script'
  )`
}
