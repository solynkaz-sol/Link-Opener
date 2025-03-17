// ==UserScript==
// @name         Open Simpcity Links
// @namespace    https://github.com/solynkaz-sol
// @version      0.6.2
// @description  Open Simpcity unread watched threads
// @updateURL https://github.com/solynkaz-sol/Link-Opener/raw/refs/heads/master/dist/sc-opener.user.js
// @downloadURL https://github.com/solynkaz-sol/Link-Opener/raw/refs/heads/master/dist/sc-opener.user.js
// @supportURL https://github.com/solynkaz-sol/Link-Opener/issues
// @author       Sol
// @match        *://simpcity.su/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function openSimpcityLinks(timing = 5750) {
    const links = document.querySelectorAll('a[href$="/unread"]');

    if (links.length > 0) {
      for (const [index, link] of links.entries()) {
        setTimeout(() => {
          link.href = link.href.replace('/unread', '/latest');
          window.open(link.href, '_blank');
        }, timing * index);
      }
    }
  }

  function addButton(title, func) {
    const button = document.createElement('button');
    button.innerText = title;
    button.style.marginLeft = '10px';
    button.style.padding = '5px 10px';
    button.style.backgroundColor = '#007bff';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';

    button.addEventListener('click', () => {
      func();
    });

    return button;
  }

  function addButtonToHeader() {
    const header = document.querySelector('.p-body-header .p-title');
    const links = document.querySelectorAll('a[href$="/unread"]');

    if (header && links.length > 0) {
      const container = document.createElement('div');
      container.style.cssText = `
            display: flex;
            gap: 8px;
            flex-direction: column;
            justify-content: end;
            padding-bottom: 6px;
        `;
      const openWithTimingBtn = addButton('Open unseen threads (slow)', () => {openSimpcityLinks()})
      const openWithoutTiming = addButton('Open unseen threads (instant)', () => {openSimpcityLinks(0)})

      container.appendChild(openWithTimingBtn);
      container.appendChild(openWithoutTiming);
      header.append(container);
    }
  }

  addButtonToHeader();
})();
