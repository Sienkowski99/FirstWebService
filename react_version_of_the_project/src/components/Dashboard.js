import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
const axios = require("axios");

const Dashboard = (props) => {
  // const main = {
  //   backgroundColor: "orange",
  //   display: "flex",
  //   justifyContent: "space-around",
  //   alignItems: "top",
  //   width: "80%",
  // };
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

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/addUserToDB", {
        date: pickedDate,
        personInitials: props.userStatus.user.login,
      })
      .then((res) => {
        console.log(res);
        let x = props.serverResponse;
        x.data.content =
          res.data.updatedYear.months[
            months.indexOf(props.serverResponse.data.content.name)
          ];
        props.changeServerResponse(x);
      })
      .then((y) => {
        if (x) {
          setX(false);
        } else {
          setX(true);
        }
      })
      .catch((err) => console.log(err));
  }
  const [x, setX] = useState(true);
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [pickedDate, setPickedDate] = useState(new Date());
  const [resData, setResData] = useState(props.serverResponse.data);
  // const [displayedMonth, setDisplayedMonth] = useState(
  //   props.serverResponse.data.content.name
  // );
  const [displayedMonth, setDisplayedMonth] = useState(
    props.serverResponse.data.content.name
  );
  // const [monthWithYear, setMonthWithYear] = useState(props.month);
  function handlePrevious() {
    console.log("Requesting previous month");
    const monthToRequest = months.indexOf(
      props.serverResponse.data.content.name
    );
    if (monthToRequest - 1 < 0) {
      alert("error");
      return;
    }
    //WHAT IF monthToRequest GOES BELOW 0 OR ABOVE 11
    //NEED TO ADD PREV/NEXT YEAR FUNCTIONALITY
    axios
      .post("http://127.0.0.1:8000/updateMonth", {
        login: props.userStatus.login,
        password: props.userStatus.password,
        reqMonth: monthToRequest - 1,
      })
      .then((res) => {
        console.log(res);
        if (res.data.authenticated) {
          props.changeServerResponse(res);
        } else {
          alert("User not existing");
        }
      })
      .catch((err) => alert(err));
  }
  function handleNext() {
    console.log("Requesting next month");
    const monthToRequest = months.indexOf(
      props.serverResponse.data.content.name
    );
    if (monthToRequest + 1 > 11) {
      alert("error");
      return;
    }
    //WHAT IF monthToRequest GOES BELOW 0 OR ABOVE 11
    //NEED TO ADD PREV/NEXT YEAR FUNCTIONALITY
    axios
      .post("http://127.0.0.1:8000/updateMonth", {
        login: props.userStatus.login,
        password: props.userStatus.password,
        reqMonth: monthToRequest + 1,
      })
      .then((res) => {
        console.log(res);
        if (res.data.authenticated) {
          props.changeServerResponse(res);
        } else {
          alert("User not existing");
        }
      })
      .catch((err) => alert(err));
  }
  useEffect(() => {
    console.log("DASGOBIARD NOITICED DATA CHANGED");
  }, [props]);
  function handleLogOut() {
    props.pickComponent("LoginForm");
    props.changeServerResponse({});
    props.changeUserStatus({ user: {}, status: "NOT_LOGGED_IN" });
    Cookies.remove("userStatus");
  }
  return (
    <div
      style={{
        // backgroundColor: "#17b0ff",
        backgroundColor: "#131E22",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        color: "white",
        fontWeight: "bold",
        letterSpacing: "2px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          borderBottom: "solid white 2px",
          margin: "0",
          padding: "20px 0",
          // position: "absolute",
        }}
      >
        <button
          style={{
            backgroundColor: "#e7e7e7",
            color: "black",
            border: "none",
            padding: "5px 10px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "10%",
          }}
          onClick={() => props.pickComponent("Profile")}
        >
          💻 Profile
        </button>
        <h1 style={{ margin: "0" }} class="w3-animate-left">
          {/* {props.userStatus.status} as {props.userStatus.user.login} */}
          Welcome {props.userStatus.user.login}!
        </h1>
        <button
          style={{
            backgroundColor: "#e7e7e7",
            color: "black",
            border: "none",
            padding: "5px 10px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "10%",
          }}
          onClick={() => handleLogOut()}
        >
          Log out ✘
        </button>
      </div>
      {/* <div
        style={{
          display: "flex",
          width: "10%",
          justifyContent: "space-around",
        }}
      >
        <button onClick={() => handleLogOut()}>Log out</button>
        <button onClick={() => props.pickComponent("Profile")}>Profile</button>
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "95%",
          justifyContent: "space-around",
          margin: "25px 0",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            // backgroundColor: "blue",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: "25%",
            height: "25vh",
          }}
        >
          <label>
            Pick the date and time that you're willing to sacrifice for meeting
            up with friends. Everything will be updated in real time.
          </label>
          <input
            type="datetime-local"
            id="freeTime"
            name="freeTime"
            min={new Date()}
            max="2021-12-31T00:00"
            onChange={(e) => {
              setPickedDate(e.target.value);
              console.log(e.target.value);
            }}
            style={{
              backgroundColor: "#e7e7e7",
              color: "black",
              border: "none",
              padding: "5px 10px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "15px",
              fontWeight: "bold",
              // borderRadius: "10%",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#e7e7e7",
              color: "black",
              border: "none",
              padding: "5px 10px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "15px",
              fontWeight: "bold",
              borderRadius: "10%",
            }}
          >
            Sacrifice 🙏
          </button>
        </form>
        <div
          id="datesElement"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "40%",
            borderLeft: "solid white 2px",
            borderRight: "solid white 2px",
            padding: "0 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button
              style={{
                backgroundColor: "#e7e7e7",
                color: "black",
                border: "none",
                padding: "5px 10px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "15px",
                fontWeight: "bold",
                borderRadius: "10%",
              }}
              onClick={handlePrevious}
            >
              🢀 Previous
            </button>
            <h2>{props.serverResponse.data.content.name}</h2>
            <button
              style={{
                backgroundColor: "#e7e7e7",
                color: "black",
                border: "none",
                padding: "5px 10px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "15px",
                fontWeight: "bold",
                borderRadius: "10%",
              }}
              onClick={handleNext}
            >
              Next 🢂
            </button>
          </div>
          {props.serverResponse.data.content.days.map((day) => (
            <div key={day.day}>
              <h3 key={day.day}>{day.day}</h3>
              <p>People willing to meet</p>
              <ul>
                {day.availablePeople.map((obj) => (
                  <div key={obj.personInitials}>
                    <h4>
                      {obj.personInitials}:{" "}
                      {obj.availableHours.map((h) => (
                        <p key={h}>{h}</p>
                      ))}
                    </h4>
                  </div>
                ))}
                {/* ;((el) => (
                  <p key={el}>{el}</p>
                ))} */}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ width: "25%" }}>
          <img src={require("../images/kociak.png")} />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "50px",
          borderTop: "solid white 2px",
          paddingLeft: "10%",
        }}
      >
        <p>© Siennicznik 2020 </p>
      </div>
    </div>
  );
};
export default Dashboard;
