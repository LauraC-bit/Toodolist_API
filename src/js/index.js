import todo from "./todo.js";

const main = async () => {
  let input = document.getElementById("input");
  let button = document.getElementById("button");
  let body = document.getElementById("body");
  let container = document.getElementById("container");
  let inputValue = "";
  let newTodo = null;
  let finalData = [];
  let dataArray = [];

  const getLocalStorage = () => {
    const storage = localStorage.getItem("data");
    if (!storage) {
      return null;
    }
    let previousData = JSON.parse(storage);
    // return previousData;
    finalData.push(...previousData);
  };

  getLocalStorage();

  let sendIt = async () => {
    inputValue = input.value;
    newTodo = new todo(1, 1, inputValue, false);

    let toDo = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        id: 1,
        title: newTodo.title,
        completed: newTodo.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await toDo.json();
    finalData.push(data);
    const dataJson = JSON.stringify(finalData); //transformation du fichier en json pour le stocker localement.
    localStorage.setItem("data", dataJson);
    // const dataFromLocalS = localStorage.getItem("data");
    // finalData = JSON.parse(dataFromLocalS);
    // recuperation et transformation de la donnee json vers le format js depuis le local storage
    container.innerHTML = "";
    finalData.forEach((element) => {
      creatediv(element);
    });

    console.log(finalData);
  };

  button.addEventListener("click", sendIt);

  let creatediv = (element) => {
    let div = document.createElement("div");
    let inputCheckbox = document.createElement("input");
    inputCheckbox.id = "checkbox";
    inputCheckbox.value = "unchecked";
    inputCheckbox.type = "checkbox";
    inputCheckbox.classList.add("inputCheckbox");
    div.classList.add("finalData");
    div.append(inputCheckbox);
    div.prepend(element.title);
    container.append(div);
    input.value = "";

    let cross = () => {
      if (inputCheckbox.value === "unchecked") {
        element.completed = true;
        inputCheckbox.value = "checked";
        console.log(element.completed);
      } else if (inputCheckbox.value === "checked") {
        element.completed = false;
        inputCheckbox.value = "unchecked";
        console.log("false");
      }
    };

    inputCheckbox.addEventListener("click", cross);
  };

  finalData.forEach((element) => {
    creatediv(element);
  });
};

window.addEventListener("load", main);
