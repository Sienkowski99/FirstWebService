const express = require("express");
const app = express();
const cors = require("cors");
const monk = require("monk");

const db = monk("localhost:27017/firstWebService");
const users = db.get("users");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dynamic server of 'Firends schedule'");
});

// function validateUser(formData) {
//   if (formData.login === "RL") {
//     return formData.password === "LR";
//   } else if (formData.login === "PH") {
//     return formData.password === "hiński";
//   } else if (formData.login === "KT") {
//     return formData.password === "HP";
//   } else if (formData.login === "ŁG") {
//     return formData.password === "HP";
//   } else if (formData.login === "KJ") {
//     return formData.password === "JK";
//   } else if (formData.login === "DB") {
//     return formData.password === "BD";
//   } else if (formData.login === "PS") {
//     return formData.password === "SP";
//   } else {
//     return "NoUser";
//   }
// }

// function validateUser2(body) {

// }

app.post("/checkuser", (req, res) => {
  console.log(req.body);
  // console.log(typeof req.body);
  // validateUser2(req.body);
  // }
  // if (validateUser(req.body) === true) {
  //   res.json({
  //     state: true,
  //     msg: "In the future there will be a list of dates",
  //   });
  // } else {
  //   res.json({
  //     state: false,
  //     msg: "Password is invalid or given user doesn't exist",
  //   });
  // }
  console.log("Starting connection to database");
  // console.log(req.body);
  const x = req.body.login;
  console.log(typeof x);
  users.find({ login: x }).then((result) => {
    console.log(result[0].password);
    console.log(req.body.password);
    if (result[0].password === req.body.password) {
      console.log("mam takiego");
      res.json({
        state: true,
        msg: "In the future there will be a list of dates",
      });
    } else {
      console.log("nie mam");
      res.json({
        state: false,
        msg: "Password is invalid or given user doesn't exist",
      });
    }
  });
});

app.listen(8000, () => {
  console.log("App listening on port http://localhost:8000");
});
