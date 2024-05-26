import { useEffect, useState } from 'react'

import './App.css'
import CreateTodos from '../components/CreateTodos'
import Todos from '../components/Todos'



function App() {
  const [todos, setTodos] = useState([]);
  //this is a bad practise to use fetch (Get stuck in an infinite calling/fetching the url  )
  // fetch("http://localhost:3000/todos")
  //   .then(async (res) => {
  //     const result = await res.json()
  //     // .then(setTodos(result.todos))
  //     setTodos(result.todos)

  //   })

  //Using useEffect hook solves the infinite calling / fetching issue 

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const result = await res.json()
        // .then(setTodos(result.todos))
        setTodos(result.todos)

      })
  }, [])

  return <div>
    <CreateTodos />

    <Todos myTodos={todos} />
  </div>

}

export default App
