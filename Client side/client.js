// const { response } = require("express");

console.log("Jestem tu");
const API_URL_checkuser =
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000/checkuser"
    : "http://161.35.207.19:8000/checkuser";

const API_URL_getCalendar =
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000/getCurrentMonthWithDates"
    : "http://161.35.207.19:8000/getCurrentMonthWithDates";

const form = document.querySelector(".loginForm");
const cover = document.querySelector(".cover");
const scheduleContent = document.querySelector(".scheduleContent");

cover.style.display = "none";
scheduleContent.style.display = "none";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "October",
  "September",
  "November",
  "December",
];

function getCalendar() {
  fetch(API_URL_getCalendar, {
    method: "GET",
    // body: JSON.stringify({ date: todaysDate.getDay() }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((x) => x.json())
    .then((x) => {
      console.log(x);
      x.msg;
    });
}

const todaysDate = new Date();
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

    // const info = resp.msg;
    // const info = getCalendar();
    const info = resp.content.days;
    const main = document.createElement("div");
    const inside =
      `
    <div>
    <div style="display: flex; justify-content: space-between; align-items: top;">
      <form class="yourFreeTime" style="width: 30%; justify-content: flex-start;">
        <label style="color: #114161; font-size: 20px;" for="freeTime"
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
            font-size: 20px;
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
      <div>
        <div style="display: flex; justify-content: space-between; height: 30px;">
        <button>Previous</button>
        <h2 style="margin: auto 0; color: #114161;">
          ` +
      // months[todaysDate.getMonth()]
      resp.content.title +
      `
        </h2>
        <button>Next</button>
        </div>` +
      info +
      `</div>
      <img
        src="https://www.animalsheltering.org/sites/default/files/styles/article/public/images/hero/201501WhatsThatBug1.jpg"
        width="300"
        height="200"
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

// const formFreeTime = document.querySelector(".yourFreeTime");
scheduleContent.addEventListener("submit", (event) => {
  event.preventDefault();
  // cover.style.display = "";
  const formFreeTimeData = new FormData(scheduleContent);
  const freeTime = formFreeTimeData.get("freeTime");
  // const password = formData.get("password");
  console.log(freeTime);

  // const package = {
  //   login,
  //   password,
  // };
  console.log("duawdaiuwhduihawd\nuhduawd\nwdawd\ndawdwa");
});
