const HYF_REPOS_URL = "https://api.github.com/orgs/HackYourFuture/repos";
const rootElement = document.getElementById("root");

function fetchJSON() {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  const params = "per_page=" + 100;
  xhr.onload = function () {
    if (xhr.status == 200) {
      const result = createHYFObj(xhr.response);
      createAndAppend(result);
    } else if (xhr.status == 400) {
      console.log("Not Found");
    }
  };
  xhr.onerror = function (error) {
    createAndAppend("", "Request failed");
  };

  xhr.open("GET", HYF_REPOS_URL + "?" + params, true);
  xhr.send();
}

function createHYFObj(response) {
  const hyfArray = [];
  response.forEach((item) => {
    const hyfObj = {};
    hyfObj.Description = item.description;
    hyfObj.Repositories = item.name;
    hyfObj.Fork = item.forks;
    hyfObj.Updated = new Date(item.updated_at).toLocaleString();
    hyfObj.URL = item.html_url;
    hyfArray.push(hyfObj);
  });

  hyfArray.sort((a, b) => a.Repositories.localeCompare(b.Repositories));

  return hyfArray;
}

function createAndAppend(response, errorMessage = "") {
  /**  header  */
  const headerDiv = createHtmlTag("div",rootElement, "", "header");
  const header = createHtmlTag("h1", headerDiv,"HYF Repositories");

  /** Error block */
  if (errorMessage !== "") {
    const error = createHtmlTag("div",rootElement ,"", "error");
    const errorMessageTag = createHtmlTag("h3", error,errorMessage);
    return;
  }

  /** main  */

  response.forEach((repository) => {
    const mainDiv = createHtmlTag("div",rootElement, "", "main");
    const blockDiv = createHtmlTag("div", mainDiv,"", "block");

    /** Repository */
    createHtmlBlock(repository.Repositories,"Repository: ", blockDiv,repository.URL);

    /** Description */
    createHtmlBlock(repository.Description, "Description: ", blockDiv);

    /** Forks */
    createHtmlBlock(repository.Fork, "Forks: ", blockDiv);

    /** Updated */
    createHtmlBlock(repository.Updated, "Updated: ", blockDiv);

  });
}

function createHtmlTag(tag,appendObject, innerText = "", className = "", url = "") {
  const htmlTag = document.createElement(tag);
  if (innerText !== "") htmlTag.innerText = innerText;
  if (className !== "") htmlTag.className = className;
  if (url !== "") {
    htmlTag.href = url;
    htmlTag.target = "_blank";
  }
  if(appendObject){
    appendObject.appendChild(htmlTag);

  }
  return htmlTag;
}
function createHtmlBlock(value, fieldName, blockDiv, url = "") {
  const field = createHtmlTag("div", "","", "field");
  const label = createHtmlTag("label", "",fieldName);

  let span = "";
  if (url !== "") {
    span = createHtmlTag("span");
    const a = createHtmlTag("a",span, value, "", url);
  } else {
    span = createHtmlTag("span", "",value);
  }
  field.appendChild(label).appendChild(span);
  blockDiv.appendChild(field);
}

function main() {
  fetchJSON();
}

main();
