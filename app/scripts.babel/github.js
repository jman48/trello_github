const GITHUB_URL = 'https://api.github.com';
const DEFAULT_ORG = 'vitrepixel';

export function getRepos(token) {
  return fetch(`${GITHUB_URL}/orgs/${DEFAULT_ORG}/repos`, {
    method: 'get',
    headers: {
      'Authorization': `token ${token}`
    }
  }).then((response) => {
    return response.json();
  })
}