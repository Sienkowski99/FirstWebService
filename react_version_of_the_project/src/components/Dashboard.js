import React, { useState } from "react";
const axios = require("axios");

const Dashboard = (props) => {
  const main = {
    backgroundColor: "orange",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "top",
    width: "80%",
  };
  // console.log(props.showUserStatus());
  function handleSubmit(event) {
    event.preventDefault();
    // let x = new Date();
    // console.log(x.getDay());
    // console.log(typeof pickedDate);
    axios
      .post("http://127.0.0.1:8000/addUserToDB", {
        date: pickedDate,
        personInitials: "KJ",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  // console.log(props.userStatus);
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [pickedDate, setPickedDate] = useState(new Date());
  const [resData, setResData] = useState(props.serverResponse.data);
  // const [monthWithYear, setMonthWithYear] = useState(props.month);
  return (
    <div>
      <h1>{props.userStatus.status}</h1>
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
          <button>Previous</button>
          <p>{resData.content.title}</p>
          <button>Next</button>
        </div>
        {resData.content.days2.days.map((element) => (
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
