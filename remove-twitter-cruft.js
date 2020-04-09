// ==UserScript==
// @name         Remove Twitter Cruft
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove unwanted sections of Twitter
// @author       You
// @match        https://twitter.com/home
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Choose selectors on page to hide
  const targets = [
    {
      selector: '[aria-label*="trend" i]',
      found: false,
    },
    {
      selector: '[aria-label*="who to follow" i]',
      found: false,
    },
    {
      selector: '[aria-label*="lists" i]',
      found: false,
    },
    {
      selector: '[aria-label*="bookmarks" i]',
      found: false,
    },
    {
      selector: '[aria-label*="explore" i]',
      found: false,
    },
  ];

  // Select the node that will be observed for mutations
  const targetNode = document.querySelector("body");

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
      targets.forEach((target) => {
        const nodes = document.querySelectorAll(target.selector);

        if (nodes.length > 0) {
          nodes.forEach((node) => {
            node.style.display = "none";
            console.log(
              `Remove Twitter Cruft hid selector: "${target.selector}"`
            );
          });

          target.found = true;
        }
      });

      if (targets.every((target) => target.found)) {
        console.log(`Remove Twitter Cruft hid all targeted selectors.`);
        observer.disconnect();
        break;
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
})();
