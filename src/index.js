let eventGlobal
const env = process.env.NODE_ENV

export default function(event) {
  if (!eventGlobal) {
    const script = document.querySelector('[data-sa-global]')
    eventGlobal = script ? script.getAttribute('data-sa-global') : 'sa'
    debug(`Simple Analytics: Using global variable [${eventGlobal}] for events`)
  }
  if (window[eventGlobal]) {
    debug('Simple Analytics: Tracking event')
    return window[eventGlobal](event)
  }
  return debug('Simple Analytics: Events script is not loaded')
}

export function debug(msg) {
  return env !== 'production' ? console.debug(msg) : null
}
