import { createIssue } from './github';

export function showPopOver(x, y, repos) {
  const popOver = $('.pop-over');

  $(popOver).append(createPopoverContent(repos));
  $(popOver).addClass('is-shown');
  $(popOver).css({'top': y, 'left': x});
}

export function hidePopOver() {
  const popOver = $('.pop-over');

  $(popOver).removeClass('is-shown');
  $(popOver).html('');
}

export function listAdded(element) {
  //In Trello the list we want to add to has the title "Add" so look for that
  return $(element).find('div.window-module > h3:first').text() == 'Add';
}

function createPopoverContent(repos) {
  let content = $(`<div class="content">
      <div class="pop-over-header">
        <span class="pop-over-header-title">Create issue in repo:</span>
        <a href="#" class="pop-over-header-close-btn icon-sm icon-close"></a>
      </div>
      <div class="pop-over-content">
        <ul class="pop-over-list">
        </ul>
      </div>
    </div>
  `);

  $(content).find('ul').append(
    repos.map((repo) => {
      return $('<li>').append($('<a>').text(repo.name));
    })
  );

  $(content).find('a').on('click', (event) => createIssue($(event.target).text()));

  return content;
}