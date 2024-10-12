const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
const addBtn = document.querySelector("#addItem");
const clearBtn = document.querySelector("#clearList");
let toDoList = [];
// functions
const makeList = function (todoItem) {
  itemList.innerHTML = "";
  todoItem.forEach((value, index) => {
    itemList.insertAdjacentHTML(
      "beforeend",
      `<div class="item">
        <div class="item-info">
          <h6 class="item-index">${index + 1}</h6>
          <p class="item-name">${value}</p>
        </div>
        <div class="item-icon">
          <i class="far fa-check-circle complete-item"></i>
          <i class="far fa-edit edit-item"></i>
          <i class="far fa-times-circle delete-item"></i>
        </div>
      </div>`
    );
    handleItem(value);
  });
};
const sendFeedback = function (text, className) {
  feedback.innerHTML = `${text}`;
  feedback.classList.add(`${className}`);
};
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputName = itemInput.value;
  if (!Boolean(inputName)) {
    sendFeedback("empty", "red");
  } else if (toDoList.includes(inputName)) {
    sendFeedback("nooo", "red");
  } else {
    toDoList.push(inputName);
    makeList(toDoList);
    itemInput.value = "";
  }
});
const handleItem = function (itemName) {
  const items = itemList.querySelectorAll(".item");
  items.forEach((value) => {
    if (
      value
        .querySelector(".item-name")
        .textContent.trim()
        .toLocaleLowerCase() === itemName.trim().toLocaleLowerCase()
    ) {
      value
        .querySelector(".complete-item")
        .addEventListener("click", function () {
          let itemIndex = value.querySelector(".item-index");
          let itemName = value.querySelector(".item-name");
          itemIndex.classList.toggle("completed");
          itemName.classList.toggle("completed");
        });
      value
        .querySelector(".delete-item")
        .addEventListener("click", function () {
          toDoList.forEach((valueIn, index) => {
            if (valueIn === value.querySelector(".item-name").textContent) {
              toDoList.splice(index, 1);
            }
          });
          makeList(toDoList);
        });
    }
  });
};
