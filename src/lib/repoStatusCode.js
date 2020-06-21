export async function repoStatusCode(repoUrl) {
  const apiRepoUrl = `https://api.github.com/repos/${repoUrl}`;
  const response = await fetch(apiRepoUrl);
  return response.status;
}