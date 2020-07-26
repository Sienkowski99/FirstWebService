console.log("Jestem tu");

const form = document.querySelector("form");
const cover = document.querySelector(".cover");

cover.style.display = "none";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  cover.style.display = "";
  const formData = new FormData(form);
  const login = formData.get("login");
  const password = formData.get("password");

  const package = {
    login,
    password,
  };
  console.log(package);
  console.log("Form has been submited");
  //   form.reset();
});
