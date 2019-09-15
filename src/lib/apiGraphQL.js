import Config from "../config";

const fetchOneGraph = Config.fetchOneGraph;

const operationsDoc = `
  query ContributedRepoQuery {
    gitHub {
      viewer {
        repositoriesContributedTo(
          first: 10
          orderBy: { direction: DESC, field: CREATED_AT }
        ) {
          nodes {
            id
            nameWithOwner
            name
            url
          }
        }
      }
    }
  }

  query RepoQuery($repo: String!, $owner: String!) {
    gitHub {
      repositoryOwner(login: $owner) {
        repository(name: $repo) {
          name
          url
          owner {
            login
          }
          description
          forks {
            totalCount
          }
          issues {
            totalCount
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }

  query IssuesQuery($owner: String!, $repo: String!) {
    gitHub {
      repositoryOwner(login: $owner) {
        repository(name: $repo) {
          issues(first: 5, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
            totalCount
            data: edges {
              cursor
              node {
                id
                title
                url
                state
                author {
                  login
                }
                labels(first: 5) {
                  data: edges {
                    node {
                      id
                      name
                    }
                  }
                }
                createdAt
              }
            }
          }
        }
      }
    }
  }

  query IssuesBeforeQuery($owner: String!, $repo: String!, $cursor: String) {
    gitHub {
      repositoryOwner(login: $owner) {
        repository(name: $repo) {
          issues(first: 5, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}, before: $cursor) {
            totalCount
            data: edges {
              cursor
              node {
                id
                title
                url
                state
                author {
                  login
                }
                labels(first: 5) {
                  data: edges {
                    node {
                      id
                      name
                    }
                  }
                }
                createdAt
              }
            }
          }
        }
      }
    }
  }

  query IssuesAfterQuery($owner: String!, $repo: String!, $cursor: String) {
    gitHub {
      repositoryOwner(login: $owner) {
        repository(name: $repo) {
          issues(first: 5, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}, after: $cursor) {
            totalCount
            data: edges {
              cursor
              node {
                id
                title
                url
                state
                author {
                  login
                }
                labels(first: 5) {
                  data: edges {
                    node {
                      id
                      name
                    }
                  }
                }
                createdAt
              }
            }
          }
        }
      }
    }
  }

  query FetchGoals($labels: [String!]!) {
    gitHub {
      viewer {
        repository(name: "open-sauced-goals") {
          issues(
            first: 100
            orderBy: { direction: DESC, field: CREATED_AT }
          ) {
            totalCount
            nodes {
              id
              title
              body
              labels(first: 100) {
                nodes {
                  color
                  name
                  id
                }
              }
              state
            }
          }
        }
      }
    }
  }

  mutation CreateOpenSaucedGoalsRepo {
    gitHub {
      createRepository(
        input: {
          visibility: PUBLIC
          name: "open-sauced-goals"
          description: "A list of contributions I might like to make some day!"
        }
      ) {
        repository {
          id
          name
          nameWithOwner
          url
        }
      }
    }
  }

  mutation CreateGoal(
    $repoId: ID!
    $title: String!
    $notes: String
  ) {
    __typename
    gitHub {
      createIssue(
        input: {
          title: $title
          repositoryId: $repoId
          body: $notes
        }
      ) {
        issue {
          id
          title
          labels(first: 100) {
            nodes {
              name
              id
              color
            }
          }
        }
      }
    }
  }

  mutation UpdateGoal(
    $id: ID!
    $labelIds: [ID!]
    $state: GitHubIssueState
    $title: String
    $notes: String
  ) {
    __typename
    gitHub {
      updateIssue(
        input: {
          id: $id
          labelIds: $labelIds
          state: $state
          title: $title
          body: $notes
        }
      ) {
        issue {
          id
        }
      }
    }
  }
`;

function fetchContributedRepoQuery() {
  return fetchOneGraph(operationsDoc, "ContributedRepoQuery");
}

function fetchRepoQuery(owner, repo) {
  return fetchOneGraph(operationsDoc, "RepoQuery", {repo: repo, owner: owner});
}

function fetchIssuesQuery(owner, repo, cursor) {
  return fetchOneGraph(operationsDoc, "IssuesQuery", {owner: owner, repo: repo});
}

function fetchIssuesBeforeQuery(owner, repo, cursor) {
  return fetchOneGraph(operationsDoc, "IssuesBeforeQuery", {owner: owner, repo: repo, cursor: cursor});
}

function fetchIssuesAfterQuery(owner, repo, cursor) {
  return fetchOneGraph(operationsDoc, "IssuesAfterQuery", {owner: owner, repo: repo, cursor: cursor});
}

function fetchGoalsQuery(labels) {
  return fetchOneGraph(operationsDoc, "FetchGoals", {labels: labels});
}

function createOpenSaucedGoalsRepo() {
  return fetchOneGraph(operationsDoc, "CreateOpenSaucedGoalsRepo", {});
}

function createGoal(repoId, title, notes) {
  return fetchOneGraph(operationsDoc, "CreateGoal", {repoId: repoId, title: title, body: notes});
}

function updateGoal(id, labelIds, title, state, notes) {
  return fetchOneGraph(operationsDoc, "UpdateGoal", {
    id: id,
    labelIds: labelIds,
    state: state,
    title: title,
    body: notes,
  });
}

const api = {
  fetchRepositoryData: fetchRepoQuery,
  fetchContributedRepoQuery,

  fetchIssuesQuery,
  fetchRepositoryIssues: (owner, repo, cursor, previous = false) => {
    const issueFetcher = cursor && previous ? fetchIssuesBeforeQuery : fetchIssuesAfterQuery;

    return issueFetcher(owner, repo, cursor);
  },
  fetchGoalsQuery,
  createOpenSaucedGoalsRepo,
  createGoal,
  updateGoal
};

export default api;
