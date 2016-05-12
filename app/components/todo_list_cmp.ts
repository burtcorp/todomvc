import {
	Component,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy
} from 'angular2/core'

import {
	Todo,
	TodoStore
} from '../services/store'
import {TodoCmp} from './todo_cmp'

@Component({
	selector: 'todo-list-cmp',
	templateUrl: 'app/components/todo_list_cmp.html',
	directives: [TodoCmp],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListCmp {
	@Input() todos: Todo[]
	@Output() toggle = new EventEmitter()
	@Output() update = new EventEmitter()
	@Output() remove = new EventEmitter()

	ngDoCheck() {
		console.log('TodoListCmp#ngDoCheck')
	}
}
