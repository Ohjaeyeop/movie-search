import { api } from "./api.js";

const form = document.querySelector("form");
const inputValue = document.getElementById("name");

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(api.movieInfo(inputValue.value));
};

form.addEventListener("submit", handleSubmit);
