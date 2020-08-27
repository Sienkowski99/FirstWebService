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
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/addUserToDB", {
        date: pickedDate,
        personInitials: props.userStatus.user.login,
      })
      .then((res) => {
        console.log(props.serverResponse);
        console.log(res);
        let x = props.serverResponse;
        x.data.content.days2 = res.data.updatedDates.months[7];
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
  // const [monthWithYear, setMonthWithYear] = useState(props.month);
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
        {props.userStatus.status} as {props.userStatus.user.login} and{" "}
        {props.serverResponse.data.content.days2.days[0].availablePeople[0]}
      </h1>
      <button
        onClick={() => {
          console.log(
            "konsolka",
            props.serverResponse.data.content.days2.days[0].availablePeople
              .length
          );
        }}
      >
        Check state
      </button>
      {/* <button
        onClick={() => {
          if (x) {
            setX(false);
          } else {
            setX(true);
          }
        }}
      >
        Refresh
      </button> */}
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
        <input
          style={{ backgroundColor: "red" }}
          type="datetime-local"
          id="freeTime2"
          name="freeTime2"
          min={new Date()}
          max="2021-12-31T00:00"
          onChange={(e) => {
            setPickedDate(e.target.value);
            // console.log(e.target.value);
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
          <button disabled>Previous</button>
          <p>{props.serverResponse.data.content.title}</p>
          <button disabled>Next</button>
        </div>
        {props.serverResponse.data.content.days2.days.map((element) => (
          <div key={element.day}>
            <h3 key={element.day}>{element.day}</h3>
            <p>People willing to meet</p>
            <ul>
              {element.availablePeople.map((el) => (
                <p key={el}>{el}</p>
              ))}
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
