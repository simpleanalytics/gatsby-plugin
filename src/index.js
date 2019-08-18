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
    const script = document.querySelector('#simple-analytics')
    eventGlobal = script.getAttribute('data-sa-global') || 'sa'
    if (!script.onLoad) {
      script.onload = onLoad
    }
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
