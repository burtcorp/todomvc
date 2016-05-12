import {Injectable} from 'angular2/core'
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

@Injectable()
export class Storage {
	get(key: string) {
		return JSON.parse(localStorage.getItem(key) || '[]')
	}

	set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value))
	}
}

@Injectable()
export class TodoStore {
	private storageKey = 'angular2-todos'
	private _todos: Array<Todo>
	todos: ReplaySubject<Array<Todo>> = new ReplaySubject(1)

	constructor(private storage: Storage) {
		let persistedTodos = storage.get(this.storageKey)
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
    if (index == -1) {
		throw new Error("Can not find Todo in store");
    } else {
		this._todos = [
			...this._todos.slice(0, index),
			...this._todos.slice(index + 1)
		]
		this.storeUpdated()
    }
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
		this._todos = this._todos.map(todo => {
			let copy = new Todo(todo.title)
			copy.completed = completed
			return copy
		})
		this.storeUpdated()
	}

	removeCompleted() {
		this._todos = this._todos.filter(todo => todo.completed === false)
		this.storeUpdated()
	}

	private storeUpdated() {
		this.storage.set(this.storageKey, this._todos)
		this.todos.next(this._todos)
	}
}
