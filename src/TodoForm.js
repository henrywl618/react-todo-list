import React, {useState} from "react";

const TodoForm = ({submitAction, removeTodo,title,edit=false,id})=>{

    let [todoInput,setTodoInput] = useState("");

    const handleChange = (e)=>{
        setTodoInput(e.target.value);
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        edit ? submitAction(id,todoInput) : submitAction(todoInput);
        setTodoInput("");
    };

    return (
        <form>
            <h3>{title}</h3>
            <label htmlFor="todo">Enter a reminder: </label>
            <input type="text"name="todo" id="todo" onChange={handleChange} value={todoInput} role="input"/>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default TodoForm;