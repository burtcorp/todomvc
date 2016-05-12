import {Component,Input} from 'angular2/core'
import {Todo,TodoStore} from '../services/store'
import {TodoViewTitleCmp} from './todo_view_title_cmp'

@Component({
	selector: 'todo-cmp',
	templateUrl: 'app/components/todo_cmp.html',
	directives: [TodoViewTitleCmp],
  inputs: ['todo']
})
export class TodoCmp {
  todo: Todo

	constructor(private todoStore: TodoStore) {}

	ngDoCheck() {
		console.log('TodoCmp#ngDoCheck')
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo)
	}

	editTodo(todo: Todo) {
		todo.editing = true
	}

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle
		todo.editing = false
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim()
		todo.editing = false

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo)
		}

		todo.title = editedTitle
	}

	remove(todo: Todo){
		this.todoStore.remove(todo)
	}
}
