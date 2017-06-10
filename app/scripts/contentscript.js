'use strict';

const CUSTOM_BUTTON = '<a class="button-link">Create issue</a>';

$(document).ready(function () {
  console.log('Running');
  $('body').on('DOMNodeInserted', function (event) {

    //Only add our custom button if the list we want to add it to has been added to page
    if (listAdded(event.target)) {

      const list = $('div.window-sidebar > div:nth-child(1) > div');
      $(list).append(CUSTOM_BUTTON);
    }
  });

  const listAdded = (element) => {
    //In Trello the list we want to add to has the title "Add" so look for that
    return $(element).find('div.window-module > h3:first').text() == "Add";
  }
});
