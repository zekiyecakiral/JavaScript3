"use strict";

const endPoint = "https://www.randomuser.me/api";

const button = document.getElementById("add");

function newFriendWithXHR() {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status == 200) {
      addNewFriend(convertToMyObject(xhr.response));
      console.log(xhr.response);
    } else if (xhr.status == 400) {
      console.log("Not Found");
    }
  };
  xhr.onerror = function () {
    alert("Request failed");
  };

  xhr.open("GET", endPoint, true);
  xhr.send();
}
function newFriendWithAxios() {
  axios
    .get(endPoint)
    .then(function (response) {
      addNewFriend(convertToMyObject(response.data));
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
      console.log("All done");
    });
}

function convertToMyObject(response) {
  const myObj = {
    title: response.results[0].name.title,
    name: response.results[0].name.first,
    lastName: response.results[0].name.last,
    email: response.results[0].email,
    image: response.results[0].picture.medium,
  };
  return myObj;
}

function addNewFriend(newFriend) {
  const container = document.createElement("div");
  container.className = "container";

  const block = document.createElement("div");
  block.className = "block";

  const name = document.createElement("p");
  name.innerText = ` ${newFriend.title}  ${newFriend.name}   ${newFriend.lastName}`;
  block.appendChild(name);

  const email = document.createElement("p");
  email.innerText = ` ${newFriend.email}`;
  block.appendChild(email);

  const img = document.createElement("img");
  img.src = `${newFriend.image}`;
  img.height = "100";
  img.width = "100";

  container.appendChild(img);
  container.appendChild(block);
  document.body.appendChild(container);
}

//button.addEventListener("click", newFriendWithAxios);
button.addEventListener("click", newFriendWithXHR);
