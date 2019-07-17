const React = require('react');

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const domain = pluginOptions.domain || 'cdn.simpleanalytics.io';
  const scriptName =
    domain === 'cdn.simpleanalytics.io' ? 'hello.js' : 'app.js';
  const scriptUrl = `https://${domain}/${scriptName}`;

  const options = {
    src: scriptUrl,
    async: true
  };

  if (pluginOptions.metomic) {
    options.type = 'text/x-metomic';
    options.metomic = pluginOptions.metomic;
  }

  setHeadComponents([
    React.createElement('script', {
      key: 'plugin-simpleanalytics',
      dangerouslySetInnerHTML: {
        __html: loadScript(domain, options)
      }
    })
  ]);
};

// this script runs when the page loads, it does the following;
// 1. Checks the doNotTrack option, and if set then it aborts and does nothing
// 2. Creates a script tag for the Simple Analytics script
// 3. Sets all the options properties on the script tag
// 4. Inserts the script tag before the first other script in the document
const loadScript = (domain, options) => {
  return `!(function(s, i, m, p, l, e) {
    if (
      s.doNotTrack == "1" ||
      m.doNotTrack == "yes" ||
      m.doNotTrack == "1" ||
      m.msDoNotTrack == "1" ||
      (s.external.msTrackingProtectionEnabled && s.external.msTrackingProtectionEnabled())
    ) {
      return console.warn('Simple Analytics: Not loading script when doNotTrack is enabled');
    }
    l = i.createElement(p);
    l.src="${options.src}";
    l.type="${options.type}";
    ${
      options.metomic
        ? `l.setAttribute("data-micropolicy","${options.metomic}")`
        : ''
    }
    e = i.getElementsByTagName(p)[0];
    e.parentNode.insertBefore(l, e);
  })(
    window,
    document,
    navigator,
    'script'
  )`;
};
