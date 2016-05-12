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

	toggle(todo: Todo) {
		this.todoStore.toggle(todo)
	}

	update(todo: Todo) {
		this.todoStore.update(todo)
	}

	remove(todo: Todo) {
		this.todoStore.remove(todo)
	}

	setAllTo(completed: Boolean) {
		this.todoStore.setAllTo(completed)
	}

	removeCompleted() {
		this.todoStore.removeCompleted()
		this.todos = this.todoStore.todos
	}

	allCompleted() {
		console.log('TodoApp#allCompleted')
		return this.todos.length === this.getCompleted().length
	}

	getRemaining() {
		console.log('TodoApp#getRemaining')
		return this.getWithCompleted(false)
	}

	getCompleted() {
		console.log('TodoApp#getCompleted')
		return this.getWithCompleted(true)
	}

	private getWithCompleted(completed: Boolean) {
		return this.todos.filter((todo: Todo) => todo.completed === completed)
	}
}
