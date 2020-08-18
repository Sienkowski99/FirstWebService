const express = require("express");
const app = express();
const cors = require("cors");
const monk = require("monk");

const sha256 = require("js-sha256");

// console.log(sha256("Gładyś"));
function hash(word) {
  console.log(sha256(word));
  return sha256(word);
}

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

function msc(res) {
  const date = new Date();
  console.log(date.getDate());
  const month = date.getMonth();
  const year = date.getFullYear();
  console.log(months[month] + " " + year);
  let x = "";
  dates
    .find({ year: year, month: month })
    .then((found) => {
      console.log(found[0].days[date.getDate() - 1]);
      console.log(found[0].days);
      found[0].days.forEach((element) => {
        console.log(element);
        console.log(element.availablePeople);
        x =
          x +
          `\n<div>
        <h4>` +
          element.day +
          `</h4>
        <h7>List of friends willing to meet</h7>
        <ul>
          <li>` +
          element.availablePeople +
          `</li>
        </ul>
        </div>`;
      });
    })
    .then((nic) => {
      console.log(x);
      let html = {
        title: months[month] + " " + year,
        days: x,
      };
      console.log(html.days);
      // return html;
      return res.json({
        state: true,
        msg: "In the future there will be a list of dates",
        content: html,
      });
    });
}

const db = monk("localhost:27017/firstWebService");
const users = db.get("users");
const dates = db.get("dates");

function dbUpdate() {
  let lista = [];
  for (let i = 0; i < 31; i++) {
    lista.push({
      day: i + 1,
      availablePeople: [],
    });
  }
  k = {
    year: 2020,
    month: 7,
    days: lista,
  };
  // console.log(k);
  dates.insert(k);
}
// dbUpdate();
function dbInsertUserUpdate() {
  dates.update(
    { month: 7, "days.day": 12 },
    { $push: { "days.$.availablePeople": "PS" } }
  );
  console.log("added user to database")
}

app.use(cors());
app.use(express.json());
// dbInsertUserUpdate();
app.get("/", (req, res) => {
  res.send("Dynamic server of 'Firends schedule'");
});

app.get("/admin", (req, res) => {
  res.send("Admin panel will be added in the future.'");
});

app.get("/getCurrentMonthWithDates", (req, res) => {
  res.json({
    msg: "BLABLA",
  });
});

app.post("/checkuser", (req, res) => {
  console.log(req.body);
  console.log("Starting connection to database");
  console.log(req.body);
  const x = req.body.login;
  console.log(typeof x);
  users
    .find({ login: x })
    .then((result) => {
      console.log(result[0].password);
      console.log(req.body.password);
      if (result[0].password === req.body.password) {
        console.log("mam takiego");
        msc(res);
      } else {
        console.log("nie mam (haslo)");
        res.json({
          state: false,
          msg: "Password is invalid",
        });
      }
    })
    .catch((error) => {
      console.log("nie mam (haslo)");
      res.json({
        state: false,
        msg: "Given user doesn't exist",
      });
    });
});

app.listen(8000, () => {
  console.log("App listening on port http://localhost:8000");
});
