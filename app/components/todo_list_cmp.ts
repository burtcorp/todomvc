import {Component} from 'angular2/core'
import {TodoStore} from '../services/store'
import {TodoCmp} from './todo_cmp'

@Component({
	selector: 'todo-list-cmp',
	templateUrl: 'app/components/todo_list_cmp.html',
	directives: [TodoCmp]
})
export class TodoListCmp {
  todoStore: TodoStore

  constructor(todoStore: TodoStore) {
    this.todoStore = todoStore
  }
}
