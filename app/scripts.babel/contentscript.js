'use strict';

import { getRepos } from './github';

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

      $(list).find('.trello-github').on('click', onClick);
    }
  });

  const listAdded = (element) => {
    //In Trello the list we want to add to has the title "Add" so look for that
    return $(element).find('div.window-module > h3:first').text() == 'Add';
  };

  const onClick = (event) => {
    const popOver = $('.pop-over');

    $(popOver).append(popUp);
    $(popOver).addClass('is-shown');
    $(popOver).css({'top': event.pageY, 'left': event.pageX});

    $('.pop-over-header-close-btn').on('click', () => {
      $(popOver).removeClass('is-shown');
      $(popOver).html('');
    });
  };
});

const popUp = `
  <div class="content">
    <div class="pop-over-header">
      <span class="pop-over-header-title">Create issue in repo:</span>
      <a href="#" class="pop-over-header-close-btn icon-sm icon-close"></a>
    </div>
    <div class="pop-over-content">
      <ul class="pop-over-list">
        <li><a href="#">Repo 1</a></li>
        <li><a href="#"> Repo 2</a></li>
      </ul>
    </div>
  </div>
`;
