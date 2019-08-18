"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.debug = debug;
var eventGlobal;
var env = process.env.NODE_ENV;

function _default(event) {
  if (!eventGlobal) {
    var script = document.querySelector('[data-sa-global]');
    eventGlobal = script ? script.getAttribute('data-sa-global') : 'sa';
    debug(`Simple Analytics: Using global ${eventGlobal}`);
  }

  if (window[eventGlobal]) {
    debug('Simple Analytics: Tracking event');
    return window[eventGlobal](event);
  }

  return debug('Simple Analytics: Events script is not loaded');
}

function debug(msg) {
  return env !== 'production' ? console.debug(msg) : null;
}