// This file is temporary and meant to be a workaround for GitHub App limitations
// https://github.com/open-sauced/open-sauced/pull/699#issuecomment-649126860

const url = "https://serve.onegraph.com/graphql?app_id=06238984-0a96-4774-95ad-d7b654c980c5";

// variables are generically labelled for easy updating.
// TODO: combine these into one doc
const doc_id0 = "9c4b4f3d-c27d-434f-ba20-7ccf8308a9a1";
const doc_id1 = "a0722788-adb0-4731-96fb-9e50c72a2528";
const doc_id2 = "ed0abd8a-3ff3-46ce-bd1f-04f94af25d12";
const doc_id3 = "c8c187a1-853f-446b-b3fa-b4876447c954";
const doc_id4 = "8ecd5737-ebba-4807-a20b-4155272500bf";
const doc_id5 = "89a3dc22-4355-494e-9d6f-a29c21e065e0";
const doc_id6 = "a510812e-ad0d-4181-bda3-805ee2481a83";

// TODO: Move this entire file to an npm package
function makeFetch(doc_id, requiredVariables = []) {
  return async function(variables = {}, operationName = false) {
    const body = {doc_id};
    if (operationName) body.operationName = operationName;
    // Validate required variables by presence
    if (requiredVariables.length > 0) {
      if (!variables || variables === undefined) throw "No required variables provided for persisted fetch";
      const missing = [];
      for (name of requiredVariables) {
        if (!variables.hasOwnProperty(name)) missing.push(name);
      }
      if (missing.length > 0) throw `Missing required variables: ${missing.join(", ")}.`;
    }
    if (variables) body.variables = variables;
    const options = {
      method:"POST",
      body: JSON.stringify(body)
    };
    const response = await fetch(url, options)
      .then(res => res.json())
      .then(json => json);
    return response;
  };
}
const persistedForkFetch = makeFetch(doc_id0, ["repoName", "repoOwner"]);
const persistedRepoDataFetch = makeFetch(doc_id1, ["repo", "owner"]);
const persistedGoalFetch = makeFetch(doc_id2, ["number"]);
const persistedInteractionsFetch = makeFetch(doc_id3, ["repo", "owner"]);
const persistedIssuesFetch = makeFetch(doc_id4, ["repo", "owner"]);
const persistedDeploymentFetch = makeFetch(doc_id5);
const persistedIssuesByLabelFetch = makeFetch(doc_id6, ["repo", "owner"]);
export {
  persistedForkFetch,
  persistedRepoDataFetch,
  persistedGoalFetch,
  persistedInteractionsFetch,
  persistedIssuesFetch,
  persistedDeploymentFetch,
  persistedIssuesByLabelFetch, //{repo: repo, owner: owner}
};

/*
async function persistedForkFetch(repo, owner, queryName) {
  const options = {
    method: "POST",
    body: JSON.stringify({doc_id: doc_id0, operationName: queryName, variables: {repoName: repo, repoOwner: owner}}),
  };
  const response = await fetch(url, options)
    .then(res => res.json())
    .then(json => json);

  return response;
}

async function persistedRepoDataFetch(owner, repo) {
  const options = {
    method: "POST",
    body: JSON.stringify({doc_id: doc_id1, variables: {repo: repo, owner: owner}}),
  };
  const response = await fetch(url, options)
    .then(res => res.json())
    .then(json => json);

  return response;
}

async function persistedGoalFetch(number) {
  const options = {
    method: "POST",
    body: JSON.stringify({doc_id: doc_id2, variables: {number: number}}),
  };
  const response = await fetch(url, options)
    .then(res => res.json())
    .then(json => json);

  return response;
}

async function persistedInteractionsFetch(owner, repo) {
  const options = {
    method: "POST",
    body: JSON.stringify({doc_id: doc_id3, variables: {repo: repo, owner: owner}}),
  };
  const response = await fetch(url, options)
    .then(res => res.json())
    .then(json => json);

  return response;
}

async function persistedIssuesFetch(owner, repo) {
  const options = {
    method: "POST",
    body: JSON.stringify({doc_id: doc_id4, variables: {repo: repo, owner: owner}}),
  };
  const response = await fetch(url, options)
    .then(res => res.json())
    .then(json => json);

  return response;
}

async function persistedDeploymentFetch() {
  const options = {
    method: "POST",
    body: JSON.stringify({doc_id: doc_id5}),
  };
  const response = await fetch(url, options)
    .then(res => res.json())
    .then(json => json);

  return response;
}

async function persistedIssuesByLabelFetch(owner, repo) {
  const options = {
    method: "POST",
    body: JSON.stringify({doc_id: doc_id6, variables: {repo: repo, owner: owner}}),
  };
  const response = await fetch(url, options)
    .then(res => res.json())
    .then(json => json);

  return response;
}
*/
