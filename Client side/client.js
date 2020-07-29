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
  if (resp.state) {
    // const dates = document.createElement("p");
    // dates.textContent = resp.msg;
    // console.log(resp.msg);
    // div.appendChild(dates);
    const info = resp.msg;
    const main = document.createElement("div");
    const inside =
      `
    <div>
    <div style="display: flex; justify-content: space-between;">
      <form class="yourFreeTime">
        <label style="color: #114161;" for="freeTime"
          >Pick the date and time that you're willing to sacrifice for meeting
          up with friends</label
        >
        <input
          type="datetime-local"
          id="freeTime"
          name="freeTime"
          min="2020-07-28T00:00"
          max="2021-12-31T00:00"
        />
        <button
          class="freeTimeButton"
          style="
            font-size: 30px;
            background-color: #114161;
            text-transform: uppercase;
            font-weight: bold;
            margin-top: 10px;
            color: white;
          "
        >
          Sacrifice
        </button>
      </form>
      <p>` +
      info +
      `</p>
      <img
        src="https://www.animalsheltering.org/sites/default/files/styles/article/public/images/hero/201501WhatsThatBug1.jpg"
        width="400"
        height="300"
      />
    </div>
    </div>
    `;
    main.innerHTML = inside;
    div.appendChild(main);
    scheduleContent.style.width = "75%";
  } else {
    const errorInfo = document.createElement("p");
    errorInfo.textContent = resp.msg;
    const reloadPage = document.createElement("div");
    reloadPage.innerHTML =
      '<button onClick="history.go(0);" style="background-color: #114161; color: white; font-weight: bold; font-size: 20px;">Try Again</button>';
    console.log(resp.msg);
    reloadPage.style.textAlign = "center";
    reloadPage.style.marginBottom = "15px";
    div.appendChild(errorInfo);
    div.appendChild(reloadPage);
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
