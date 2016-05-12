import {
  TodoStore,
  Todo
} from '../../app/services/store'

let todo1 = new Todo("Write example")
let todo2 = new Todo("Make sure it works")
let todo3 = new Todo("Drink coffee")
let todo4 = new Todo("Write more code")
let todo5 = new Todo("I did this yesterday", true)

describe('Todo', () => {
  it('gets the title of an object', () => {
    expect(todo1.title).toEqual("Write example")
  })

  it('sets the title of an object', () => {
    todo2.title = "Make SURE it works"
    expect(todo2.title).toEqual("Make SURE it works")
  })

  it('completed property defaults to false', () => {
    expect(todo1.completed).toBeFalsy()
  })

  it('sets completed property', () => {
    expect(todo5.completed).toBeTruthy()
  })
})

class Storage {
  todos: Todo[]

  constructor(todos: Todo[]) {
    this.todos = todos
  }

  public get(key: String) {
    return this.todos
  }

  public set(key: String, value: Boolean) {}
}

describe('TodoStore', () => {
  let store: TodoStore
  let todos: Todo[]

  describe('#new', () => {
    it('creates an empty store by default', () => {
      store = new TodoStore(new Storage([]))
      store.todos.subscribe(todos => expect(todos).toEqual([]))
    })

    it('creates a store from a saved state', () => {
      store = new TodoStore(new Storage([todo1, todo2, todo3]))
      store.todos.subscribe(todos => expect(todos).toEqual([todo1, todo2, todo3]))
    })
  })

	describe('#add', () => {
    let populatedStore = new TodoStore(new Storage([new Todo("Some Task")]))

    describe('mutability', () => {
      let todosAfterAdd = [todo1]

      it('does not mutate stored todos on add', () => {
        let beforeAdd = new TodoStore(new Storage([]))
        beforeAdd.add(todo1.title)
        beforeAdd.todos.subscribe(todos => {
          expect(todos).toEqual(todosAfterAdd)
        })
      })
    })

		it('adds a todo to an empty list', () => {
			store = new TodoStore(new Storage([]))
			store.add("New Task")
			store.todos.subscribe(todos => {
				expect(todos.length).toEqual(1)
			})
		})

    it('adds a todo to a populated list', () => {
      populatedStore.add("Yet another task")
      populatedStore.todos.subscribe(todos => {
        expect(todos.length).toEqual(2)
      })
    })
	})

  describe('#remove', () => {
    beforeEach(() => {
      store = new TodoStore(new Storage([]))
      store.todos.subscribe(updatedTodos => todos = updatedTodos)
    })

    it('removes todos from store', () => {
      store.add("1st")
      store.add("2nd")
      let t = todos[0]
      store.remove(t)
      expect(todos.length).toEqual(1)
    })

    it('throws error when todo cannot be found', () => {
      store = new TodoStore(new Storage([]))
      expect(() => {
        store.remove(todo1)
      }).toThrow( new Error("Can not find Todo in store"))
    })
  })
})


