// const { response } = require("express");

console.log("Jestem tu");
const API_URL_checkuser = "http://localhost:8000/checkuser";

const form = document.querySelector("form");
const cover = document.querySelector(".cover");
const scheduleContent = document.querySelector(".scheduleContent");

cover.style.display = "none";
scheduleContent.style.display = "none";

function ifLoginSuccess(resp) {
  form.reset();

  cover.style.display = "none";
  form.style.display = "none";
  scheduleContent.style.display = "";

  const div = document.createElement("div");
  const msg = document.createElement("p");
  msg.textContent = resp.msg;
  console.log(resp.msg);
  div.appendChild(msg);

  if (resp.state) {
    const img = document.createElement("div");
    img.innerHTML =
      '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Stray_kitten_Rambo002.jpg/1200px-Stray_kitten_Rambo002.jpg" width="400" height="300">';
    div.appendChild(img);
  }
  scheduleContent.appendChild(div);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  cover.style.display = "";
  const formData = new FormData(form);
  const login = formData.get("login");
  const password = formData.get("password");

  const package = {
    login,
    password,
  };
  console.log(package);
  console.log("Form has been submited");
  //   form.reset();

  fetch(API_URL_checkuser, {
    method: "POST",
    body: JSON.stringify(package),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      setTimeout(() => {
        ifLoginSuccess(resp);
      }, 1000);
    });
});
