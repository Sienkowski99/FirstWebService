const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dynamic server of 'Firends schedule'");
});

function validateUser(formData) {
  if (formData.login === "RL") {
    return formData.password === "LR";
  } else if (formData.login === "PH") {
    return formData.password === "hiński";
  } else if (formData.login === "KT") {
    return formData.password === "HP";
  } else if (formData.login === "ŁG") {
    return formData.password === "HP";
  } else if (formData.login === "KJ") {
    return formData.password === "JK";
  } else if (formData.login === "DB") {
    return formData.password === "BD";
  } else if (formData.login === "PS") {
    return formData.password === "SP";
  } else {
    return "NoUser";
  }
}

app.post("/checkuser", (req, res) => {
  console.log(req.body);
  if (validateUser(req.body) === true) {
    res.json({
      state: true,
      msg: "In the future there will be a list of dates",
    });
  } else {
    res.json({
      state: false,
      msg: "Password is invalid or given user doesn't exist",
    });
  }
});

app.listen(8000, () => {
  console.log("App listening on port http://localhost:8000");
});
