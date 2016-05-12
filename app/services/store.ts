import {ReplaySubject} from 'rxjs/Rx'

export class Todo {
	completed: Boolean

	private _title: String
	get title() {
		return this._title
	}
	set title(value: String) {
		this._title = value.trim()
	}

	constructor(title: String, completed: Boolean = false) {
		this.title = title.trim()
		this.completed = completed
	}
}

export class TodoStore {
	private _todos: Array<Todo>
	todos: ReplaySubject<Array<Todo>> = new ReplaySubject(1)

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]')
		// Normalize back into classes
		this._todos = persistedTodos.map( (todo: {_title: String, completed: Boolean}) => {
			let ret = new Todo(todo._title)
			ret.completed = todo.completed
			return ret
		})
		this.todos.next(this._todos)
	}

	add(title: String) {
		this._todos = [...this._todos, new Todo(title)]
		this.storeUpdated()
	}

	remove(todo: Todo) {
    let index = this._todos.indexOf(todo)
		this._todos = [
			...this._todos.slice(0, index),
			...this._todos.slice(index + 1)
		]
		this.storeUpdated()
	}

	update(todo: Todo) {
		let index = this._todos.indexOf(todo)
		let copy = new Todo(todo.title, todo.completed)
		this._todos = [
			...this._todos.slice(0, index),
			copy,
			...this._todos.slice(index + 1)
		]
		this.storeUpdated()
	}

	toggle(todo: Todo) {
		todo.completed = !todo.completed
		this.update(todo)
	}

	setAllTo(completed: Boolean) {
		// this.todos.forEach((t: Todo) => t.completed = completed)
		// this.updateStore()
	}

	removeCompleted() {
		// this.todos = this.todos.filter((todo: Todo) => todo.completed === false)
		// this.updateStore()
	}

	private storeUpdated() {
		localStorage.setItem('angular2-todos', JSON.stringify(this._todos))
		this.todos.next(this._todos)
	}
}
