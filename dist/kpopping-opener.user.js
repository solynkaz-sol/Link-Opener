// ==UserScript==
// @name         Open Kpopping Threads
// @namespace    https://github.com/solynkaz-sol
// @version      0.3
// @description  Open Unwatched Notification threads
// @updateURL https://github.com/solynkaz-sol/Link-Opener/raw/refs/heads/master/dist/kpopping-opener.user.js
// @downloadURL https://github.com/solynkaz-sol/Link-Opener/raw/refs/heads/master/dist/kpopping-opener.user.js
// @author       Sol
// @match        *://kpopping.com/user/notifications
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function createButton(title, onClick) {
    const button = document.createElement('button');
    button.innerText = title;
    button.style.cssText = `
      color: rgb(255, 255, 255);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: rgb(0, 123, 255) !important;
      white-space: nowrap;
      font-size: 13px;
    `;
    button.addEventListener('click', onClick);
    return button;
  }

  function createInputField() {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter a number';
    input.autofocus = true; // Automatically focus on the input field
    input.style.cssText = `
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 10px;
      width: 180px;
    `;
    input.addEventListener('input', (event) => {
      const value = event.target.value;
      event.target.value = value.replace(/[^0-9]/g, '');
    });

    // Add event listener for "Enter" key
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const inputValue = input.value;
        if (inputValue) {
          openLinks(inputValue);
        }
      }
    });

    return input;
  }

  function openLinks(count) {
    const divs = document.getElementsByClassName("bubbly bubbly-left bubbly-one-sided bubbly-earless");
    const numberOfLinks = count > divs.length ? divs.length : count;
    for (let i = 0; i < numberOfLinks; i++) {
      const link = divs[i].querySelector('a').href;
      window.open(link, '_blank');
    }
  }

  function init() {
    const box = document.getElementsByClassName('col sidebar')[0];
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: row;
      justify-content: end;
      padding-bottom: 6px;
    `;
    const inputField = createInputField();

    const button = createButton('Open threads', () => {
      const inputValue = inputField.value;
      if (inputValue) {
        openLinks(inputValue);
      }
    });

    container.appendChild(inputField);
    container.appendChild(button);

    // Append the input field and button to the box
    box.prepend(container);
  }

  init();
})();
