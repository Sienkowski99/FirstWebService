const express = require("express");
const app = express();
const cors = require("cors");
const monk = require("monk");

const sha256 = require("js-sha256");
const { v4: uuidv4 } = require("uuid");

const nodemailer = require("nodemailer");

const sendMail = (clientEmail, subject, text) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "informatyksieniu@gmail.com",
        pass: "atpjeopujfmfhhcw",
      },
    });

    const mailOptions = {
      from: "informatyksieniu@gmail.com",
      to: clientEmail,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(Error("It broke"));
      } else {
        console.log("Email sent: " + info.response);
        resolve("Stuff worked!");
      }
    });
  });
};

// console.log(sha256("Gładyś"));
function hash(word) {
  console.log(sha256(word));
  return sha256(word);
}
// console.log(hash("SP"))

console.log(uuidv4());

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

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
    availableHours: [hours + ":" + (minutes < 10 ? "0" + minutes : minutes)],
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
console.log(new Date());
app.post("/resetRequest", (req, res) => {
  console.log(req.body);
  users
    .find({ email: req.body.email })
    .then((foundArray) => {
      console.log(foundArray);
      const time = new Date();
      if (foundArray.length) {
        console.log("user exists");
        const token = uuidv4();
        users
          .update(
            { email: req.body.email },
            {
              $set: {
                "notifications.$[name]": {
                  name: "resetData",
                  token: token,
                  expires: time.addHours(1),
                },
              },
            },
            { arrayFilters: [{ "name.name": "resetData" }] }
          )
          .then((done) => {
            sendMail(
              req.body.email,
              "Password reset",
              "To reset your password click the link >> http://localhost:8000/reset/" +
                token
            )
              .then(() => {
                console.log("Mail has been sent to: " + req.body.email);
                res.json("user exists");
              })
              .catch((err) => console.log("an error has occurred"));
          })
          .catch((err) => console.log("an error has occurred"));
      } else {
        console.log("user not exists");
        res.json("user not exists");
      }
    })
    .catch((err) => console.log(err));
});

app.get("/reset/:token", (req, res) => {
  let token = req.params.token;
  res.json(token);
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
