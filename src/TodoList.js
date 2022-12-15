import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo, changeTodoText, removeTodo, moveTodo }) {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} changeTodoText={changeTodoText} removeTodo={removeTodo} moveTodo={moveTodo} />
        })
    )
}