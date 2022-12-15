import { useEffect, useState } from 'react'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './App.css'
import TodoList from './TodoList'
import { v4 as uuid } from 'uuid'

function TodoCount({ total, totalCompleted }) {
  let text = ''
  if (totalCompleted) {
    text = `${totalCompleted}/${total} completed`
  } else {
    text = `${total} ${total > 1 ? 'todos' : 'todo'}`
  }

  if (total && totalCompleted === total) text += '!'

  return (
    <div className={!total ? 'hidden' : ''}>{text}</div>
  )
}

const storageKey = 'todolist-todos'

function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    // loading stored todos
    const storedTodos = JSON.parse(localStorage.getItem(storageKey))
    if (storedTodos) setTodos(prevTodos => [...prevTodos, ...storedTodos])
  }, [])

  useEffect(() => {
    // saving todos on changes
    window.localStorage.setItem(storageKey, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), text: '', completed: false }]
    })
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function changeTodoText(id, text) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.text = text
    setTodos(newTodos)
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function moveTodo(id, up) {
    let newTodos = [...todos]
    let index = -1
    const todo = newTodos.find((todo, i) => {
      if (todo.id === id) {
        index = i
        return true
      }
      return false
    })

    let indexToMove = up ? index - 1 : index + 1

    if (up && index === 0) {
      indexToMove = todos.length - 1
    } if (!up && index === todos.length - 1 ) {
      indexToMove = 0
    }

    newTodos.splice(index, 1)
    newTodos.splice(indexToMove, 0, todo)

    setTodos(newTodos)
  }

  function handleClearCompleted(e) {
    const completedCount = getTodoCount(true)
    if (completedCount > 1 && !window.confirm(`This will remove ${completedCount} todos from the list, are you sure?`)) {
      return
    }

    setTodos(todos.filter(todo => !todo.completed))
  }

  function handleClearAll(e) {
    const todoCount = getTodoCount()
    if (todoCount > 1 && !window.confirm(`This will remove ${todoCount} todos from the list, are you sure?`)) {
      return
    }

    setTodos([])
  }

  function getTodoCount(ofCompleted = false) {
    if (ofCompleted) return todos.filter(todo => todo.completed).length
    return todos.length
  }

  return (
    <>
      <TodoCount total={getTodoCount()} totalCompleted={getTodoCount(true)} />
      <TodoList todos={todos} toggleTodo={toggleTodo} changeTodoText={changeTodoText} removeTodo={removeTodo} moveTodo={moveTodo} />
      <button onClick={handleAddTodo} className="border-2 my-1 border-slate-600 hover:bg-slate-800 active:opacity-75 rounded-sm">+</button>
      <button onClick={handleClearCompleted} className="border-2 my-1 border-slate-600 hover:bg-slate-800 active:opacity-75 rounded-sm">Clear Completeds</button>
      <button onClick={handleClearAll} className="border-2 my-1 border-slate-600 hover:bg-slate-800 active:opacity-75 rounded-sm">Clear All</button>
    </>
  )
}

export default App
