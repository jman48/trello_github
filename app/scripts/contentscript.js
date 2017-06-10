'use strict';

var CUSTOM_BUTTON = '<a class="button-link trello-github">Create issue</a>';

$(document).ready(function () {
  console.log('Running');
  $('body').on('DOMNodeInserted', function (event) {

    //Only add our custom button if the list we want to add it to has been added to page
    if (listAdded(event.target)) {

      var list = $('div.window-sidebar > div:nth-child(1) > div');
      $(list).append(CUSTOM_BUTTON);

      $(list).find('.trello-github').on('click', onClick);
    }
  });

  var listAdded = function listAdded(element) {
    //In Trello the list we want to add to has the title "Add" so look for that
    return $(element).find('div.window-module > h3:first').text() == 'Add';
  };

  var onClick = function onClick(event) {
    var popOver = $('.pop-over');

    $(popOver).append(popUp);
    $(popOver).addClass('is-shown');
    $(popOver).css({ 'top': event.pageY, 'left': event.pageX });

    $('.pop-over-header-close-btn').on('click', function () {
      $(popOver).removeClass('is-shown');
      $(popOver).html('');
    });
  };
});

var popUp = '\n  <div class="content">\n    <div class="pop-over-header">\n      <span class="pop-over-header-title">Create issue in repo:</span>\n      <a href="#" class="pop-over-header-close-btn icon-sm icon-close"></a>\n    </div>\n    <div class="pop-over-content">\n      <ul class="pop-over-list">\n        <li><a href="#">Repo 1</a></li>\n        <li><a href="#"> Repo 2</a></li>\n      </ul>\n    </div>\n  </div>\n';