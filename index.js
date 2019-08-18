"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debug = debug;
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var eventGlobal;
var env = process.env.NODE_ENV;
var eventBuffer = []; // due to the async nature of SA script, the first events
// can be sent before the script has loaded, so we buffer
// them here and then send them when the script has loaded

var onLoad = function onLoad() {
  var event;

  while (event = eventBuffer.pop()) {
    trackEvent(event);
  }
};

var trackEvent = function trackEvent(event) {
  if (!eventGlobal) {
    var script = document.querySelector('#simple-analytics');
    eventGlobal = script.getAttribute('data-sa-global') || 'sa';

    if (!script.onLoad) {
      script.onload = onLoad;
    }

    debug(`Simple Analytics: Using global variable [${eventGlobal}] for events`);
  }

  if (window[eventGlobal]) {
    if (!debug(`Simple Analytics: Tracking event ${event}`)) {
      return window[eventGlobal](event);
    }
  }

  eventBuffer = [].concat(_toConsumableArray(eventBuffer), [event]); // buffer this event
};

function debug(msg) {
  return env !== 'production' ? console.debug(msg) : null;
}

var _default = trackEvent;
exports.default = _default;