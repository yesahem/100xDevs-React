/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
// A component / function which Lists all the Todos.

function Todos({ myTodos }) {

  return <div>
    {myTodos.map((listTodo) => {
      return <div>
        <h2>{listTodo.title}</h2>
        <h3>{listTodo.description}</h3>
        <button>{listTodo.isComplete == true ? 'Completed' : 'Mark as complete'}</button>
      </div>
    })}

  </div>

}


export default Todos
