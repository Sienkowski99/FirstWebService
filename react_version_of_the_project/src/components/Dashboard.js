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
        backgroundColor: "#17b0ff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <h1>
        {props.userStatus.status} as {props.userStatus.user.login}
      </h1>
      <div style={{ display: "flex" }}>
        <button onClick={() => handleLogOut()}>Log out</button>
        <button onClick={() => props.pickComponent("Profile")}>Profile</button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "80%" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            // backgroundColor: "blue",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "30%",
          }}
        >
          <label>
            Pick the date and time that you're willing to sacrifice for meeting
            up with friends
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
          />
          <button
            type="submit"
            //   style={
            //     {
            //       fontSize: "20px",
            //       backgroundColor: "#114161",
            //       textTransform: "uppercase",
            //       fontWeight: "bold",
            //       marginTop: "10px",
            //       color: "white",
            //     }
            //   }
          >
            sacrifice
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
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button onClick={handlePrevious}>Previous</button>
            <h2>{props.serverResponse.data.content.name}</h2>
            <button onClick={handleNext}>Next</button>
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

        <img
          style={{ width: "30%", height: "250px" }}
          src="https://www.catster.com/wp-content/uploads/2018/01/An-orange-tabby-cat-with-the-M-marking-on-the-forehead.jpg"
        />
      </div>
    </div>
  );
};
export default Dashboard;
