const GITHUB_URL = 'https://api.github.com';
const DEFAULT_ORG = 'vitrepixel';
let TOKEN;

import { hidePopOver } from './elements';

export function getRepos() {
  return fetch(`${GITHUB_URL}/orgs/${DEFAULT_ORG}/repos`, {
    method: 'get',
    headers: {
      'Authorization': `token ${TOKEN}`
    }
  }).then((response) => {
    return response.json();
  })
}

export function createIssue(repo) {
  const card_title = $('.mod-card-back-title').val();
  const title = removeStoryPoints(card_title);

  fetch(`${GITHUB_URL}/repos/${DEFAULT_ORG}/${repo}/issues`, {
    method: 'post',
    headers: {
      'Authorization': `token ${TOKEN}`
    },
    body: JSON.stringify({
      'title': title,
      'labels': [
        'bug'
      ]
    })
  }).then((response) => response.json())
    .then((data) => {
      console.log('Data is: ', data);
      hidePopOver();
    })
}

export function setToken(token) {
  TOKEN = token;
}

function removeStoryPoints(title) {
  if (title.startsWith('(')) {
    return title.substring(3, title.length);
  }

  return title;
}