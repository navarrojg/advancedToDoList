let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	//pobiera wszystkie elementy
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");

	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	//nadajemy nasłuchiwanie
	addBtn.addEventListener("click", addNewTodo);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewTodo = () => {
	if (todoInput.value !== "") {
		newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;
		createToolArea();

		ulList.append(newTodo);

		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Nie dodałeś żadnego todosa!!!";
	}
};

const createToolArea = () => {
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("tools");
	todoDiv.style.fontSize = 0;
	newTodo.append(todoDiv);

	const btn1 = document.createElement("button");
	btn1.classList.add("complete");
	btn1.innerHTML = '<i class="fas fa-check"></i>';

	const btn2 = document.createElement("button");
	btn2.classList.add("edit");
	btn2.textContent = "EDIT";

	const btn3 = document.createElement("button");
	btn3.classList.add("delete");
	btn3.innerHTML = '<i class="fas fa-times"></i>';

	todoDiv.append(btn1, btn2, btn3);
};

const checkClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editTodo(e);
	} else if (e.target.matches(".delete")) {
		deleteTodo(e);
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest("li");
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};

const closePopup = () => {
	popup.style.display = "none";
};

const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Wstawiłeś puste pole!!!";
	}
};

const deleteTodo = (e) => {
	e.target.closest("li").remove();

	const allTodos = ulList.querySelectorAll("li");
	if (allTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście!";
	}
};

const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		addNewTodo();
	}
};

document.addEventListener("DOMContentLoaded", main);
