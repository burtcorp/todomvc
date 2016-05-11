export class Todo {
	completed: Boolean

	private _title: String
	get title() {
		return this._title
	}
	set title(value: String) {
		this._title = value.trim()
	}

	constructor(title: String) {
		this.completed = false
		this.title = title.trim()
	}
}

export class TodoStore {
	todos: Array<Todo>

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]')
		// Normalize back into classes
		this.todos = persistedTodos.map( (todo: {_title: String, completed: Boolean}) => {
			let ret = new Todo(todo._title)
			ret.completed = todo.completed
			return ret
		})
	}

	add(title: String) {
		this.todos.push(new Todo(title))
		this.updateStore()
	}

	remove(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1)
		this.updateStore()
	}

	update(todo: Todo) {
		this.updateStore()
	}

	toggle(todo: Todo) {
		todo.completed = !todo.completed
		this.updateStore()
	}

	setAllTo(completed: Boolean) {
		this.todos.forEach((t: Todo) => t.completed = completed)
		this.updateStore()
	}

	removeCompleted() {
		this.todos = this.todos.filter((todo: Todo) => todo.completed === false)
		this.updateStore()
	}

	private updateStore() {
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos))
	}
}
