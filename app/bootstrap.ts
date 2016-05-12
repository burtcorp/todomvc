import {provide} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'
import TodoApp from './app'
import {
  Storage,
  TodoStore
} from './services/store'

bootstrap(TodoApp, [Storage, TodoStore])
