"use strict";

const endPoint = "https://dog.ceo/api/breeds/image/random";

const buttonXHR = document.getElementById("addXHR");
const buttonAxios = document.getElementById("addAxios");

function createXHR(endPoint) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      addNewDogPhoto(xhr.response.message);
      console.log(xhr.response);
    } else {
      console.log(xhr.status, xhr.responseText);
    }
  };
  xhr.onerror = function () {
    console.log("Request failed");
  };

  xhr.open("GET", endPoint);
  xhr.send();
}
function createAxios(endPoint) {
  axios
    .get(endPoint)
    .then(function (response) {
      addNewDogPhoto(response.data.message);
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
      console.log("All done");
    });
}

function addNewDogPhoto(imgUrl) {
  const photoList = document.getElementById("list");
  const img = document.createElement("img");
  img.src = imgUrl;
  img.height = "200";
  img.width = "200";

  const item = document.createElement("li");
  item.appendChild(img);
  photoList.appendChild(item);

  document.getElementById("container").appendChild(photoList);
}

buttonXHR.addEventListener("click", function () {
  createXHR(endPoint);
});
buttonAxios.addEventListener("click", function () {
  createAxios(endPoint);
});
