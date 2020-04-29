// ==UserScript==
// @name         Remove Twitter Cruft
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove unwanted sections of Twitter
// @author       You
// @match        https://twitter.com/home
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

      // Select the node that will be observed for mutations
  const targetNode = document.querySelector('body');

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };


  const targets = ['[aria-label*="trend" i]', '[aria-label*="who to follow" i]', '[aria-label*="explore" i]', '[aria-label*="bookmarks" i]', '[aria-label*="lists" i]'];

  // Callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
      targets.forEach((target) => {
        const targetedElements = document.querySelectorAll(target);

        if (targetedElements.length > 0) {
          targetedElements.forEach((node) => {
            node.style.display = 'none';
            console.log(`Remove Twitter Cruft hid selector: "${target}"`);
          });
        }
      });
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
})();
