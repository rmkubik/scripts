// ==UserScript==
// @name         Disable Websites
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Disable Twitter
// @author       You
// @match        *://*.facebook.com/*
// @match        *://*.twitter.com/*
// @match        *://mastodon.gamedev.place/*
// @match        *://*.linkedin.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  document.body.innerHTML =
    '<h1 style="color: white; background: black; z-index: 9999999; width: 100vw; height: 100vh; overflow: hidden; position: fixed; padding: 1rem;">Site disabled</h1>';
})();
