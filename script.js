const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
const addBtn = document.querySelector("#addItem");
const clearBtn = document.querySelector("#clearList");
const toDoList = [];
// functions
const makeList = function (todoItem) {
  itemList.innerHTML = "";
  todoItem.forEach((value, index) => {
    // itemList.insertAdjacentHTML(
    //   "beforeend",
    //   `<div class="item">
    //     <div class="item-info">
    //       <h6 class="item-index">${index + 1}</h6>
    //       <p class="item-name">${value}</p>
    //     </div>
    //     <div class="item-icon">
    //       <i class="far fa-check-circle complete-item"></i>
    //       <i class="far fa-edit edit-item"></i>
    //       <i class="far fa-times-circle delete-item"></i>
    //     </div>
    //   </div>`
    // );
    // Assuming itemList is a reference to your container element
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    // Create item-info div
    const itemInfoDiv = document.createElement("div");
    itemInfoDiv.classList.add("item-info");

    // Create h6 element for item index
    const itemIndex = document.createElement("h6");
    itemIndex.classList.add("item-index");
    itemIndex.textContent = index + 1; // Set the index

    // Create p element for item name
    const itemName = document.createElement("p");
    itemName.classList.add("item-name");
    itemName.textContent = value; // Set the value

    // Append h6 and p to item-info div
    itemInfoDiv.appendChild(itemIndex);
    itemInfoDiv.appendChild(itemName);

    // Create item-icon div
    const itemIconDiv = document.createElement("div");
    itemIconDiv.classList.add("item-icon");

    // Create icons
    const completeIcon = document.createElement("i");
    completeIcon.classList.add("far", "fa-check-circle", "complete-item");

    const editIcon = document.createElement("i");
    editIcon.classList.add("far", "fa-edit", "edit-item");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-times-circle", "delete-item");

    // Append icons to item-icon div
    itemIconDiv.appendChild(completeIcon);
    itemIconDiv.appendChild(editIcon);
    itemIconDiv.appendChild(deleteIcon);

    // Append item-info and item-icon divs to the main item div
    itemDiv.appendChild(itemInfoDiv);
    itemDiv.appendChild(itemIconDiv);

    // Finally, append the itemDiv to the itemList
    itemList.appendChild(itemDiv);
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
  if (inputName.lenght === 0) {
    sendFeedback("empty", "red");
  } else if (toDoList.includes(inputName)) {
    sendFeedback("nooo", "red");
  } else {
    toDoList.push(inputName);
    makeList(toDoList);
    itemInput.value = "";
    sendFeedback("succes add", "green");
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
