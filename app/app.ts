import {Component} from 'angular2/core'
import {TodoStore, Todo} from './services/store'
import {TodoListCmp} from './components/todo_list_cmp'

@Component({
	selector: 'todo-app',
	templateUrl: 'app/app.html',
	directives: [TodoListCmp]
})
export default class TodoApp {
	todoStore: TodoStore
	newTodoText = ''

	constructor(todoStore: TodoStore) {
		this.todoStore = todoStore
	}

	removeCompleted() {
		this.todoStore.removeCompleted()
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
			this.todoStore.add(this.newTodoText)
			this.newTodoText = ''
		}
	}
}
