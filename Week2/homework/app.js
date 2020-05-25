"use strict";
const HYF_REPOS_URL = "https://api.github.com/orgs/HackYourFuture/repos";
function fetchJSON(endPoint) {
  let response = fetch(endPoint)
    .then((jsonData) => {
      return jsonData.json();
    })
    .catch((error) => {
      document.getElementById("root").innerHTML = error;
    });
  return response;
}

function renderRepositories(jsonData, filteredItem) {
  const repositoryInfoList = jsonData.map((element) => {
    const repositoryInfo = {};
    repositoryInfo.Repositories = element.name;
    repositoryInfo.Description = element.description;
    repositoryInfo.Forks = element.forks;
    repositoryInfo.Updated = new Date(element.updated_at).toLocaleString();
    return repositoryInfo;
  });

  // if not selected repository, get the first element from the array
  let filteredJSONData = jsonData[0];
  let repository = repositoryInfoList.slice(0, 1);
  // if selected repository, filteredItem is exist
  if (filteredItem) {
    filteredJSONData = jsonData.filter((item) => item.name === filteredItem)[0];

    repository = repositoryInfoList.filter(
      (item) => item.Repositories === filteredItem
    );
  }

  // following codes show the repository information
  const repo = document.getElementById("repo");
  repo.innerHTML = "";

  const repoDiv = document.createElement("div");
  repoDiv.className = "repoInfo";

  repository.forEach((element) => {
    Object.keys(element).forEach(function (key) {
      const item = document.createElement("item");
      item.className = "item";

      const label = document.createElement("label");
      label.innerText = key + ": ";

      const value = document.createElement("p");
      if (key === "Repositories") {
        const valueLink = document.createElement("a");
        valueLink.href = filteredJSONData.html_url;
        valueLink.target = "_blank";
        valueLink.innerText = element[key];

        value.appendChild(valueLink);
      } else {
        value.innerText = element[key];
      }

      item.appendChild(label);
      item.appendChild(value);
      repoDiv.appendChild(item);
    });
    repo.appendChild(repoDiv);
  });

  // this code calls the contributors who contributed to this repository
  fetchJSON(filteredJSONData.contributors_url)
  .then( (jsonData) => { renderContributors(jsonData) });

}

function renderContributors(contributorJSON) {
  // following codes show the contributors information
  const contributorList = document.getElementById("contributors");
  contributorList.innerHTML = "";

  const header = document.createElement("h3");
  header.innerHTML = "Contributions";
  contributorList.appendChild(header);

  contributorJSON.forEach((contributor) => {
    const contributorDiv = document.createElement("div");
    contributorDiv.className = "contributor";

    const contributorInfoDiv = document.createElement("div");
    contributorInfoDiv.className = "contributor-info";

    const image = document.createElement("img");
    image.src = contributor.avatar_url;

    const name = document.createElement("p");
    const nameHref = document.createElement("a");
    nameHref.href = contributor.html_url;
    nameHref.target = "_blank";
    nameHref.innerText = contributor.login;
    name.appendChild(nameHref);

    contributorInfoDiv.appendChild(image);
    contributorInfoDiv.appendChild(name);

    const contributionsCount = document.createElement("p");
    contributionsCount.className = "contributor-count";
    contributionsCount.innerText = contributor.contributions;

    contributorDiv.appendChild(contributorInfoDiv);
    contributorDiv.appendChild(contributionsCount);

    contributorList.appendChild(contributorDiv);
  });
}

function renderSelect(jsonData) {
  // following codes list the repository names
  jsonData.sort((a, b) => a.name.localeCompare(b.name));
  let selectList = document.getElementById("selectRepository");
  for (let i = 0; i < jsonData.length; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = jsonData[i].name;
    selectList.appendChild(option);
  }
}

window.onload = () => {
  // At start-up my application will display information about the first repository
  fetchJSON(HYF_REPOS_URL)
    .then( (jsonData) => { renderRepositories(jsonData) });

  // At start-up, it will be load select information
  fetchJSON(HYF_REPOS_URL)
    .then( (jsonData) => { renderSelect(jsonData) });

  // this code will be worked if select option is changed
  const repositories = document.getElementById("selectRepository");
  let selectedOption = "";
  repositories.addEventListener("change", (event) => {
    selectedOption = event.target.selectedOptions[0].text;
    fetchJSON(HYF_REPOS_URL)
    .then( (jsonData) => { renderRepositories(jsonData,selectedOption) });
  });
};
