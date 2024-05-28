/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
// A component / function which Lists all the Todos.

import { useState } from "react";
function Todos({ myTodos }) {
  const [comp, isComp] = useState(false);
  return (
    <div>

      {myTodos.map((listTodo) => {
        //Solving PR1;
        const onClickHandler = (id) => {
          try {
            fetch("http://localhost:3000/complete",
              {
                method: "PUT",
                body: JSON.stringify(
                  {
                    id: id,
                  }), headers: {
                    "Content-Type": "application/json",
                  },
              }).then((res) => {
                if (res.status != 200) {
                  alert("Something went wrong");
                  return;
                }
                listTodo.isComplete = true;
                isComp(listTodo.isComplete)
                //console.log(res);
              });

          } catch (err) {
            alert(err);
          }
        }





        return (
          <div>

            {/* <h2>{listTodo.title}</h2>
            <h3 >{listTodo.description}</h3> */}

            {
              listTodo.isComplete == true ? <s><h2>{listTodo.title}</h2></s> : <h2>{listTodo.title}</h2>
            }
            {
              listTodo.isComplete == true ? <s><h2>{listTodo.description}</h2></s> : <h2>{listTodo.description}</h2>
            }
            <button
              onClick={() => {
                onClickHandler(listTodo._id);
              }}>
              {listTodo.isComplete == true ? "Completed" : "Mark as complete"}{" "}
            </button>
          </div>
        );

      })}
    </div>
  );
}

export default Todos;
