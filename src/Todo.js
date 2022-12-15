import React, { useRef } from "react";

export default function Todo({ todo, toggleTodo, changeTodoText, removeTodo, moveTodo }) {

    const textareaRef = useRef()

    function handleTodoToggle(e) {
        toggleTodo(todo.id)
    }

    function handleTextAreaChange(e) {
        const text = e.target.value

        // resizing textarea to fit text
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight + 1) + "px";

        changeTodoText(todo.id, text)
    }

    function handleMoveUp() {
        moveTodo(todo.id, true)
    }

    function handleMoveDown() {
        moveTodo(todo.id, false)
    }

    function handleRemoveButton(e) {
        removeTodo(todo.id)
    }
    
    return (
        <div className="todo-row" completed={todo.completed.toString()}>
            <button onClick={handleTodoToggle}>
                <i className="fa fa-check"></i>
            </button>
            <textarea autoFocus rows="1" ref={textareaRef} value={todo.text} onChange={handleTextAreaChange} className="flex-grow border-b bg-transparent outline-none resize-none"></textarea>
            <button onClick={handleMoveUp}>
                <i className="fa fa-chevron-up"></i>    
            </button> 
            <button onClick={handleMoveDown}>
                <i className="fa fa-chevron-down"></i>    
            </button> 
            <button className="trash" onClick={handleRemoveButton}>
                <i className="fa fa-trash"></i>    
            </button> 
        </div>
    )
}