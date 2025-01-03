// ==UserScript==
// @name         BCR
// @namespace    https://www.bondageprojects.com/
// @version      1
// @description  Bondage club Reply Extension.
// @author       1010
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var script = document.createElement("script");
    script.src = "https://arcsery.github.io/reply-extension/bcr.js";
    document.head.appendChild(script);
})();