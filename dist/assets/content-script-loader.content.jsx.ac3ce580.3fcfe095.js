(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/content.jsx.ac3ce580.js")
    );
  })().catch(console.error);

})();
