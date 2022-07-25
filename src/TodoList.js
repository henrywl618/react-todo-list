import React, {useState} from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import {v4 as uuid} from "uuid";

const TodoList = ()=>{

    const [todos,setTodos] = useState([]);
    const [showEdit,setShowEdit] = useState({showForm:false, id:"", reminder:""});

    const addTodo = (reminder,id)=>{
        setTodos(todoList => {
            let copy = [
                ...todoList,
                {
                reminder: reminder,
                id: uuid(),
                },
            ];
            return copy;
        })
    }

    const removeTodo = (id)=>{
        setTodos(todoList => {
            let copy = [...todoList];
            return copy.filter(todo => todo.id !== id)
        })
    }

    const showEditForm = (bool,id,reminder)=>{
        setShowEdit({
                     showForm:bool,
                     id:id,
                     reminder:reminder,
                    });
    };

    const editTodo = (id,reminder)=>{
        console.log(id,reminder);
        setTodos(todoList=>{
            let copy = [...todoList];
            copy.map((todo)=>{
                if(todo.id===id){
                    todo.reminder=reminder;
                }
            });

            return copy;
        });
        setShowEdit({
            showForm:false,
            id:"",
            reminder:"",
        });
    }



    return(
        <>
        <TodoForm submitAction={addTodo} title="Add a todo item."/>
        <ul>
            {todos.map(todo => <Todo 
                                    reminder={todo.reminder} 
                                    id={todo.id} 
                                    removeTodo={removeTodo}
                                    showEditForm={showEditForm}
                                />
                        )
            }
        </ul>
        {showEdit.showForm ? <TodoForm submitAction={editTodo} title={`Edit Todo: ${showEdit.reminder}`} edit={true} id={showEdit.id}/> : null}
        </>
    )
};

export default TodoList;