import todo from "./todo.js";

const main = async () => {
  let input = document.getElementById("input");
  let button = document.getElementById("button");
  let body = document.getElementById("body");
  let inputValue = "";
  let newTodo = null;
  let finalData = "";

  let sendIt = async () => {
    inputValue = input.value;
    newTodo = new todo(1, 1, inputValue, false);

    let toDo = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        id: 1,
        title: newTodo.title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await toDo.json();
    const dataJson = JSON.stringify(data); //transformation du fichier en json pour le stocker localement.
    localStorage.setItem("data", dataJson);
    const dataFromLocalS = localStorage.getItem("data");
    finalData = JSON.parse(dataFromLocalS);
    // recuperation et transformation de la donnee json vers le format js depuis le local storage
    creatediv();

    console.log(finalData);
  };

  button.addEventListener("click", sendIt);

  let creatediv = () => {
    let div = document.createElement("div");
    div.classList.add("finalData");
    div.append(finalData.title);
    body.append(div);
  };
};

window.addEventListener("load", main);
