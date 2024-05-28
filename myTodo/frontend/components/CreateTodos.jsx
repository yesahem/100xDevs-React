// Create and export a function which returns a div haveing two input boxes and a add todo button 

import { useState } from "react"

function CreateTodos() {
  const [title, setTitle] = useState("")
  const [description, setDecription] = useState("")
  return <div>

    <input type="text" placeholder="Title" style={{
      padding: 10,
      margin: 20
    }} onChange={(val) => {
      setTitle(val.target.value)
    }} /><br />
    <input type="text" placeholder="Description" style={{
      padding: 10,
      margin: 20
    }} onChange={(val) => {
      setDecription(val.target.value)
    }} /> <br />
    <button style={{
      padding: 10,
      margin: 20
    }} onClick={() => {
      fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,

        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then(res => {
        res.json().then(() => {
          alert("Todo Added")
        })


      })
    }}>
      Add Todo</button>

  </div>
}

export default CreateTodos
