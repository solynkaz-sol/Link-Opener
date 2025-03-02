// ==UserScript==
// @name         Open Simpcity Links
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Open Simpcity unread watched threads
// @author       Sol
// @match        *://simpcity.su/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const supportedSites = {
    "simpcity": 'https://simpcity.su'
  };

  function openSimpcityLinks() {
    const links = document.querySelectorAll('a[href$="/unread"]');

    if (links.length > 0) {
      for (const [index, link] of links.entries()) {
        setTimeout(() => {
          link.href = link.href.replace('/unread', '/latest');
          window.open(link.href, '_blank');
        }, 6000 * index);
      }
    }
  }

  function addButtonToHeader() {
    const header = document.querySelector('.p-body-header .p-title');
    const links = document.querySelectorAll('a[href$="/unread"]');

    if (header && links.length > 0) {
      const button = document.createElement('button');
      button.innerText = 'Open unseen threads';
      button.style.marginLeft = '10px';
      button.style.padding = '5px 10px';
      button.style.backgroundColor = '#007bff';
      button.style.color = '#fff';
      button.style.border = 'none';
      button.style.borderRadius = '4px';
      button.style.cursor = 'pointer';

      button.addEventListener('click', () => {
        openSimpcityLinks();
      });

      header.appendChild(button);
    }
  }

  addButtonToHeader();
})();
