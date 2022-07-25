import React, {useState} from "react";
import "./Todo.css";

const Todo = ({reminder, id, removeTodo, showEditForm})=>{

    let [completed, setCompleted] = useState(false);

    const handleCheck = ()=>{
        completed ? setCompleted(false) : setCompleted(true);
    };

    return <li className={completed?"Todo-completed":"Todo"} key={id}>
                {reminder} 
                <button onClick={()=>removeTodo(id)}>X</button> 
                <button onClick={()=>showEditForm(true,id,reminder)}>Edit</button>
                <label htmlFor="completed">Completed? <input id="completed" type="checkbox" onClick={handleCheck}></input></label>
            </li>
};

export default Todo;