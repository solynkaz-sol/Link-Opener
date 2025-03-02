// ==UserScript==
// @name         Open Pornolab Threads
// @namespace    https://github.com/solynkaz-sol
// @version      0.1
// @description  Open Pornolab Threads on current page
// @updateURL https://github.com/solynkaz-sol/Link-Opener/raw/refs/heads/master/dist/pn-opener.user.js
// @downloadURL https://github.com/solynkaz-sol/Link-Opener/raw/refs/heads/master/dist/pn-opener.user.js
// @author       Sol
// @match        *://pornolab.net/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function openLinks(links) {
    links.forEach(link => {
      window.open(link.href, '_blank');
    });
  }

  function openAllThreads() {
    const links = [...document.querySelectorAll('.med.tLink.bold, .torTopic.bold.tt-text')];
    openLinks(links);
  }

  function createButton(title, onClick) {
    const button = document.createElement('button');
    button.innerText = title;
    button.style.cssText = `
            margin-left: 10px;
            padding: 5px 10px;
            background-color: #007bff !important;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;
    button.addEventListener('click', onClick);
    return button;
  }

  function addButtonToHeader() {
    const isTracker = window.location.href.includes("tracker.php");
    const isForum = window.location.href.includes("forum.php");

    let header = isTracker
                 ? document.getElementById('search-results')
                 : isForum
                   ? document.querySelector('td[valign="bottom"][width="100%"] h1.maintitle')?.parentElement
                   : null;

    if (!header) return;

    const links = document.querySelectorAll('.med.tLink.bold, .torTopic.bold.tt-text');
    if (links.length === 0) return;

    const container = document.createElement('div');
    container.style.cssText = `
            display: flex;
            gap: 8px;
            justify-content: end;
            padding-bottom: 6px;
        `;

    container.appendChild(createButton('Open all threads', openAllThreads));
    isTracker ? header.prepend(container) : header.appendChild(container);
  }

  addButtonToHeader();
})();
