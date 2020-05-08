"use strict";

const endPoint = "https://xkcd.now.sh/?comic=latest";
const img = document.createElement("img");

function callApiWithXHR() {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status == 200) {
      console.log(xhr.response.img);
      img.src = xhr.response.img;
      document.body.appendChild(img);
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
function callApiWithAxios() {
  axios
    .get(endPoint)
    .then(function (response) {
      console.log(response.data.img);
      img.src = response.data.img;
      document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
      console.log("All done");
    });
}

function insertImage() {}

//callApiWithXHR();
callApiWithAxios();
