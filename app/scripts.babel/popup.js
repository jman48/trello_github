'use strict';
$(document).ready(() => {
  const saveGithubToken = (event) => {
    event.preventDefault();
    const token = $('#oAuthInput').val();

    chrome.storage.local.set({'token': token}, function () {
      console.log('Settings saved');
    });
  };

  $('#options').submit(saveGithubToken);
});