import {Component} from 'angular2/core'
import {TodoStore, Todo} from './services/store'
import {TodoListCmp} from './components/todo_list_cmp'

@Component({
	selector: 'todo-app',
	templateUrl: 'app/app.html',
	directives: [TodoListCmp]
})
export default class TodoApp {
	todos: Todo[]
	newTodoText = ''

	constructor(private todoStore: TodoStore) {
		this.todos = todoStore.todos
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
			this.todoStore.add(this.newTodoText)
			this.newTodoText = ''
		}
	}

	allCompleted() {
		return this.todoStore.allCompleted()
	}

	setAllTo(completed: Boolean) {
		this.todoStore.setAllTo(completed)
	}

	getRemaining() {
		return this.todoStore.getRemaining()
	}

	getCompleted() {
		return this.todoStore.getCompleted()
	}

	removeCompleted() {
		this.todoStore.removeCompleted()
		this.todos = this.todoStore.todos
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo)
	}

	update(todo: Todo) {
		this.todoStore.update(todo)
	}

	remove(todo: Todo) {
		this.todoStore.remove(todo)
	}
}
