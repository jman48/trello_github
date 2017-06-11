const GITHUB_URL = 'https://api.github.com';
const DEFAULT_ORG = 'vitrepixel';
let TOKEN;

import { hidePopOver, getLink } from './elements';

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
      addIssueComment(getLink(title), data.number, repo);
      hidePopOver();
    })
}

export function setToken(token) {
  TOKEN = token;
}

function removeStoryPoints(title) {
  if (title.startsWith('(')) {
    let end = title.indexOf(')') + 1;

    return title.substring(end, title.length);
  }

  return title;
}

function addIssueComment(comment, id, repo) {
  fetch(`${GITHUB_URL}/repos/${DEFAULT_ORG}/${repo}/issues/${id}/comments`, {
    method: 'post',
    headers: {
      'Authorization': `token ${TOKEN}`
    },
    body: JSON.stringify({
      body: comment
    })
  }).then(response => response.json())
    .then((data) => {
      console.log('Added comment result: ', data);
    });
}