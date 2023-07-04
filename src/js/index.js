import todo from "./todo.js";

const main = async () => {
  let input = document.getElementById("input");
  let button = document.getElementById("button");
  let container = document.getElementById("container");
  let trashCan = document.getElementById("trashCan");
  let inputValue = "";
  let newTodo = null;
  let finalData = [];
  let id = 0;

  const getLocalStorage = () => {
    const storage = localStorage.getItem("data");
    if (!storage) {
      return null;
    }
    let previousData = JSON.parse(storage);
    finalData.push(...previousData);
  };

  getLocalStorage();

  let sendIt = async () => {
    inputValue = input.value;

    if (!inputValue) {
      return;
    }

    newTodo = new todo(1, id, inputValue, false);

    let toDo = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        id: newTodo.id,
        title: newTodo.title,
        completed: newTodo.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await toDo.json();
    data.id = Math.floor(Math.random() * 100000);
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
    let p = document.createElement("p");
    inputCheckbox.id = "checkbox";
    inputCheckbox.value = "unchecked";
    inputCheckbox.type = "checkbox";
    inputCheckbox.classList.add("inputCheckbox");
    div.classList.add("finalData");
    div.append(inputCheckbox);
    p.append(element.title);
    div.prepend(p);
    container.append(div);
    input.value = "";

    let cross = () => {
      if (inputCheckbox.value === "unchecked") {
        element.completed = true;
        inputCheckbox.value = "checked";
        p.classList.add("text");
        div.setAttribute("id", "delete");
        trashCan.classList.remove("disabled");
        //---------------------------------
        const dataFromLocalS = localStorage.getItem("data");
        const finalData = JSON.parse(dataFromLocalS);
        console.log(finalData);
        element.id = "delete"; //s'affiche pas [{...}]
        localStorage.setItem("data", JSON.stringify(finalData));
        //---------------------------------
        console.log(element.completed);
      } else if (inputCheckbox.value === "checked") {
        element.completed = false;
        inputCheckbox.value = "unchecked";
        p.classList.remove("text");
        trashCan.classList.add("disabled");
        div.removeAttribute("id", "delete");
        console.log("false");
      }
    };

    let deleteDiv = () => {
      if ((inputCheckbox.value = "checked" && div.id === "delete")) {
        container.removeChild(div);

        //fonctionne mais supprime le dernier élément du storage mais pas le bon; -- index? usefull? change completed in cross if, for saying if completed is true delete this one?
      }
    };

    inputCheckbox.addEventListener("click", cross);
    trashCan.addEventListener("click", deleteDiv);
  };

  finalData.forEach((element) => {
    creatediv(element);
  });
};

window.addEventListener("load", main);
