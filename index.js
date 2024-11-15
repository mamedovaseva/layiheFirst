let addBtn = document.querySelector(".add-btn");
let circleBtn = document.querySelector(".circle-btn");
let inputText = document.querySelector("#input-text");
let clearBtn = document.querySelector(".clear-btn");
let sortIcon = document.querySelector(".sort-icon");
let todoList = document.getElementById("todolist");
let isAscending = true;
function addToList() {
    if (inputText.value.trim() !== "") {
        const list = document.querySelector("#listitems");
        const listItem = document.createElement("li");
        const listItemsCount = list.children.length + 1;
        listItem.textContent = `${listItemsCount}. ${inputText.value}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            listItem.remove();
            adjustContainerHeight();
            updateListNumbering();
        });
        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
        inputText.value = ""; 
        adjustContainerHeight();
        inputText.classList.toggle("hidden");
        todoList.classList.remove("hidden");
        clearBtn.classList.add("hidden");
        todoList.classList.add("divhidden");
    } else {
        alert("Bir söz daxil edin!");
    }
}
function adjustContainerHeight() {
    const list = document.querySelector("#listitems");
    const items = list.children.length;
    if (items === 0) {
        todoList.classList.add("hidden"); 
        inputText.classList.remove("hidden"); 
        clearBtn.classList.remove("hidden");  
    } 
    else {
        todoList.classList.add("scrollable"); 
    }
} 
function updateListNumbering() {
    const list = document.querySelector("#listitems");
    const items = list.children;
        Array.from(items).forEach((item, index) => {
        item.firstChild.textContent = `${index + 1}. ${item.firstChild.textContent.split('. ')[1]}`;
    });
}
addBtn.addEventListener("click", addToList);
function showList() {
    inputText.classList.remove("hidden");
    clearBtn.classList.remove("hidden"); 
    inputText.focus(); 
}
circleBtn.addEventListener("click", showList);

clearBtn.addEventListener("click", function() {
    inputText.value = "";
});
function sortList() {
    const list = document.querySelector("#listitems");
    const items = Array.from(list.children);
    items.sort((a, b) => {
        const textA = a.firstChild.textContent.split('. ')[1].toLowerCase();
        const textB = b.firstChild.textContent.split('. ')[1].toLowerCase();
        return isAscending ? textA.localeCompare(textB) : textB.localeCompare(textA);
    });
    list.innerHTML = "";
    items.forEach((item, index) => {
        const textContent = item.firstChild.textContent.trim();
        item.firstChild.textContent = `${index + 1}. ${textContent.split('. ')[1]}`;
        const deleteBtn = item.querySelector(".delete-btn");
        if (deleteBtn) {
            item.appendChild(deleteBtn); 
        }
        list.appendChild(item);
    });
    isAscending = !isAscending;
    sortIcon.innerHTML = isAscending ? "&#x21E1; &#9776;" : "&#x21E3; &#9776;";
    updateListNumbering();
}
sortIcon.addEventListener("click", sortList);
