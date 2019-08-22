let eventGlobal
const env = process.env.NODE_ENV

let eventBuffer = []
// due to the async nature of SA script, the first events
// can be sent before the script has loaded, so we buffer
// them here and then send them when the script has loaded
const onLoad = function() {
  let event
  while ((event = eventBuffer.pop())) {
    trackEvent(event)
  }
}

const trackEvent = function(event) {
  if (!eventGlobal) {
    // this will always be in the page, and we use it to
    // tell if SA has loaded yet
    const script = document.querySelector('#simple-analytics-loader')

    if (!isLoaded(script)) {
      script.addEventListener('script-loaded', onLoad)
    } else if (isEnabled(script)) {
      onLoad()
    }
    eventGlobal = getGlobal(script)
    debug(`Simple Analytics: Using global variable [${eventGlobal}] for events`)
  }
  if (window[eventGlobal]) {
    if (!debug(`Simple Analytics: Tracking event ${event}`)) {
      return window[eventGlobal](event)
    }
  }
  eventBuffer = [...eventBuffer, event] // buffer this event
}

export function debug(msg) {
  return env !== 'production' ? console.debug(msg) : null
}

export default trackEvent

function isEnabled(script) {
  return script.getAttribute('data-enabled')
}

function isLoaded(script) {
  return script.getAttribute('data-loaded')
}

function getGlobal(script) {
  return script.getAttribute('data-sa-global') || 'sa'
}
