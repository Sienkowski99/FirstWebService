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
// console.log(hash("SP"))
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function msc(res, reqMonth) {
  console.log(reqMonth);
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  let y = {};
  dates
    .find({ year: year, "months.name": months[reqMonth] })
    .then((found) => {
      if (found !== []) {
        y = found[0].months[reqMonth];
        found[0].months[reqMonth].days.forEach((element) => {
          console.log(element);
        });
        res.json({
          existing: true,
          authenticated: true,
          content: y,
          msg: "Returning required month",
        });
      } else {
        res.json({
          existing: true,
          authenticated: true,
          msg: "Month not in DB",
        });
      }
    })
    .catch((err) =>
      res.json({
        existing: true,
        authenticated: true,
        msg: err,
      })
    );
}

const db = monk("localhost:27017/firstWebService");
const users = db.get("users");
const dates = db.get("dates");

function dbInsertUserUpdate(
  year,
  month,
  day,
  hours,
  minutes,
  personInitials,
  res
) {
  const personWithHoursObject = {
    personInitials: personInitials,
    availableHours: [hours + ":" + minutes],
  };
  dates
    .update(
      { year: year },
      {
        $push: {
          "months.$[name].days.$[day].availablePeople": personWithHoursObject,
        },
      },
      { arrayFilters: [{ "name.name": months[month] }, { "day.day": day }] }
    )
    .then((y) => {
      console.log("Added user's date successfuly");
      dates
        .find({ year: new Date().getFullYear() })
        .then((yearObject) => {
          console.log("Returning updated dates.");
          return yearObject[0];
        })
        .then((y) => res.json({ updatedYear: y }));
    })
    .catch((err) => console.log("An error has ocurred: " + err));
  // console.log("added user to database");
}
// dbInsertUserUpdate();
app.use(cors());
app.use(express.json());
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

app.post("/registerNewUser", (req, res) => {
  users.insert({
    login: req.body.login,
    password: hash(req.body.password),
    email: req.body.email,
    friendsList: [],
    notifications: [],
  });
  console.log(req.body);
  console.log("New user has been added to DB");
  res.json("New user has been added to DB");
});

function adminUpdate() {
  // dates.insert(jedjed);
}
adminUpdate();
app.post("/addUserToDB", (req, res) => {
  const date = new Date(req.body.date);
  console.log(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    req.body.personInitials
  );
  dbInsertUserUpdate(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    req.body.personInitials,
    res
  );
  console.log(date);
});

app.post("/updateMonth", (req, res) => {
  msc(res, req.body.reqMonth);
});

app.post("/checkuser", (req, res) => {
  console.log("Starting connection to database");
  users
    .find({ login: req.body.login })
    .then((resultFromDatabase) => {
      if (resultFromDatabase === []) {
        res.json({
          existing: false,
          authenticated: false,
          msg: "Given user doesn't exist",
        });
      }
      if (resultFromDatabase[0].password === hash(req.body.password)) {
        console.log("User exists and passowrd is correct");
        msc(res, req.body.reqMonth);
      } else {
        console.log("Password is incorrect");
        res.json({
          existing: true,
          authenticated: false,
          msg: "Password is invalid",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      //User not in the Database
      res.json({
        existing: false,
        msg: "Given user doesn't exist",
      });
    });
});

app.listen(8000, () => {
  console.log("App listening on port http://localhost:8000");
});
