import {
	Component,
	Input,
	ChangeDetectionStrategy
} from 'angular2/core'

@Component({
	selector: 'todo-view-title-cmp',
	templateUrl: 'app/components/todo_view_title_cmp.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoViewTitleCmp {
  @Input() title: String

  ngDoCheck() {
    console.log(`TodoViewTitleCmp#ngDoCheck("${this.title}")`)
  }
}
