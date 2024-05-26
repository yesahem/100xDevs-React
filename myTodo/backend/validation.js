//Zod validations here

const zod = require("zod")
/* for input new todo's (for post endpoint)
 body{
 title: string,
 description: string 
 }
 */

/* for marking complete todo 
 {
 id: string 
 }
 */

const newTodo = zod.object({
  title: zod.string(),
  description: zod.string()
})

const updateTodos = zod.object({
  id: zod.string(),
})

module.exports = {
  newTodo: newTodo,
  updateTodos: updateTodos
}
