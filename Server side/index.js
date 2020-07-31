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

const db = monk("localhost:27017/firstWebService");
const users = db.get("users");
const dates = db.get("dates");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dynamic server of 'Firends schedule'");
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
        res.json({
          state: true,
          msg: "In the future there will be a list of dates",
        });
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
