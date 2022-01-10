
function addTodo() {
	const todoList = document.querySelector('#todoList');
	const index = todoList.getElementsByTagName('li').length + 1;
	let todo = document.querySelector('#newTodoInput').value;
	
	const newTodo = document.createElement('li');
	newTodo.innerHTML = `
		<input type="checkbox" name="${todo}" id="todo-${index}" value="${todo}" onclick="refresh()">
		<label for="todo-${index}">${todo}</label>
	`;

	todoList.appendChild(newTodo);
	refresh();
}

function refresh() {
	const todoList = document.querySelector('#todoList');
	let checkedNumber = todoList.querySelectorAll('input[type=checkbox]:checked').length;
	let listLength = todoList.getElementsByTagName('li').length;

	let percentage = Math.round((checkedNumber * 100) / listLength);

	document.querySelector('#checkedNumber').textContent = `${percentage}%`;
}