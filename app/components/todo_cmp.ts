import {Component,Input,Output,EventEmitter} from 'angular2/core'
import {Todo,TodoStore} from '../services/store'
import {TodoViewTitleCmp} from './todo_view_title_cmp'

@Component({
	selector: 'todo-cmp',
	templateUrl: 'app/components/todo_cmp.html',
	directives: [TodoViewTitleCmp],
  inputs: ['todo']
})
export class TodoCmp {
  @Input() todo: Todo
	@Output() toggle = new EventEmitter()
	@Output() update = new EventEmitter()
	@Output() remove = new EventEmitter()

	editing = false
	editTitle: String

	ngDoCheck() {
		console.log('TodoCmp#ngDoCheck')
	}

	edit() {
		this.editTitle = this.todo.title
		this.editing = true
	}

	cancelEdit() {
		this.editing = false
		this.editTitle = this.todo.title
	}

	updateTodo() {
		this.todo.title = this.editTitle
		this.update.next(this.todo)
		this.cancelEdit()
	}
}
