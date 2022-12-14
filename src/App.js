import React, {useState, useRef,  useEffect } from 'react';
import TodoList from './TodoList';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
//import uuidv4 from 'uuid/v4'


const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef= useRef()

  useEffect(() =>
   {
   const storedTodos = JSON.parse(localStorage.getItem
    (LOCAL_STORAGE_KEY))
   if (storedTodos) setTodos(storedTodos)
  },[])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e){
   const name = todoNameRef.current.value
   if (name ==='') return 
   setTodos(prevTodos => {return [...prevTodos, { id: uuidv4(), name, complete: false}]}  )
     todoNameRef.current.value = null
    }
  return (
  <> 
     <TodoList todos={todos} />
     <input ref={todoNameRef} type="text" />
     <button onClick={handleAddTodo}> Add Todo</button>
     <button>Clear Completed Todo</button>
     <div>0 left to do</div>
 </>
  )
}

export default App;
