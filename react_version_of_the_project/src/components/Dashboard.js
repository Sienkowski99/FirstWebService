import React, { useState } from "react";
const axios = require("axios");

const Dashboard = () => {
  const main = {
    backgroundColor: "orange",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "top",
    width: "80%",
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log("oeodkeo");
    axios
      .get("http://127.0.0.1:8000/admin")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  const [todaysDate, setTodaysDate] = useState(new Date());
  const [pickedDate, setPickedDate] = useState(new Date());

  return (
    <div style={main}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "30%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button>Previous</button>
          <p style={{ color: "red" }}>MONTH NAME</p>
          <button>Next</button>
        </div>
        <p>DATYYY</p>
      </div>

      <img
        style={{ width: "30%" }}
        src="https://www.catster.com/wp-content/uploads/2018/01/An-orange-tabby-cat-with-the-M-marking-on-the-forehead.jpg"
      />
    </div>
  );
};
export default Dashboard;
