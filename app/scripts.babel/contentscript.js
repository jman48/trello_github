'use strict';

import { getRepos } from './github';
import { showPopOver, hidePopOver, listAdded } from './elements';

const CUSTOM_BUTTON = '<a class="button-link trello-github">Create issue</a>';
let repositories = [];

$(document).ready(function () {
  console.log('Running');

  //Load all repositories
  chrome.storage.local.get('token', function(tokenObject) {
    getRepos(tokenObject.token).then((repos) => {
      repositories = repos;
    });
  });

  $('body').on('DOMNodeInserted', function (event) {

    //Only add our custom button if the list we want to add it to has been added to page
    if (listAdded(event.target)) {
      const list = $('div.window-sidebar > div:nth-child(1) > div');

      $(list).append(CUSTOM_BUTTON);
      $(list).find('.trello-github').on('click', onCreateIssueClick);
    }
  });

  const onCreateIssueClick = (event) => {
    showPopOver(event.pageX, event.pageY, repositories);

    $('.pop-over-header-close-btn').on('click', () => {
      hidePopOver();
    });
  };
});
