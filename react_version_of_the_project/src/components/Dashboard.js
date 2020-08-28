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
  // console.log(props.showUserStatus());
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
        // console.log(props.serverResponse);
        console.log(res);
        let x = props.serverResponse;
        x.data.content = res.data.updatedYear.months[months.indexOf(props.serverResponse.data.content.name)];
        // console.log({ ...x, zmiana: true });
        props.changeServerResponse(x);
        // setX("X");
        // props.changeServerResponse({ ...x, zmiana: true });
      })
      .then((y) => {
        if (x) {
          setX(false);
        } else {
          setX(true);
        }
      })
      // .then(y=>setX(y))
      .catch((err) => console.log(err));
    // setX("dno")
  }
  // console.log(props.userStatus);
  const [x, setX] = useState(true);
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [pickedDate, setPickedDate] = useState(new Date());
  const [resData, setResData] = useState(props.serverResponse.data);
  const [displayedMonth, setDisplayedMonth] = useState(props.serverResponse.data.content.name)
  // const [monthWithYear, setMonthWithYear] = useState(props.month);
  function handlePrevious() {
    console.log("Requesting previous month")
    const monthToRequest = months.indexOf(props.serverResponse.data.content.name)
    //WHAT IF monthToRequest GOES BELOW 0 OR ABOVE 11
    //NEED TO ADD PREV/NEXT YEAR FUNCTIONALITY
    axios.post("http://127.0.0.1:8000/updateMonth", { login: props.userStatus.login, password: props.userStatus.password, reqMonth: monthToRequest-1})
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
    console.log("Requesting next month")
    const monthToRequest = months.indexOf(props.serverResponse.data.content.name)
    //WHAT IF monthToRequest GOES BELOW 0 OR ABOVE 11
    //NEED TO ADD PREV/NEXT YEAR FUNCTIONALITY
    axios.post("http://127.0.0.1:8000/updateMonth", { login: props.userStatus.login, password: props.userStatus.password, reqMonth: monthToRequest+1})
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
  }
  return (
    <div>
      <h1>
        {props.userStatus.status} as {props.userStatus.user.login}
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Pick the date and time that you're willing to sacrifice for meeting up
          with friends
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
      <button onClick={() => handleLogOut()}>Log out</button>
      <div
        id="datesElement"
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "space-around",
        //   width: "30%",
        // }}
      >
        <div
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        // }}
        >
          <button onClick={handlePrevious}>Previous</button>
          <p>{props.serverResponse.data.content.name}</p>
          <button onClick={handleNext}>Next</button>
        </div>
        {props.serverResponse.data.content.days.map((day) => (
          <div key={day.day}>
            <h3 key={day.day}>{day.day}</h3>
            <p>People willing to meet</p>
            <ul>
              {day.availablePeople.map(obj => <div key={obj.personInitials}><h4>{obj.personInitials}: {obj.availableHours.map(h=> <p key={h}>{h}</p>)}</h4></div>)
              }
              {/* ;((el) => (
                <p key={el}>{el}</p>
              ))} */}
            </ul>
          </div>
        ))}
      </div>

      <img
        // style={{ width: "30%", height: "320px" }}
        src="https://www.catster.com/wp-content/uploads/2018/01/An-orange-tabby-cat-with-the-M-marking-on-the-forehead.jpg"
      />
    </div>
  );
};
export default Dashboard;
