// Simple express boilerplate code

const express = require("express")
const app = express();
const { newTodo, updateTodos } = require("./validation");
const { todoModels } = require("./Db");
app.use(express.json());
const cors = require("cors")
app.use(cors());

app.get("/todos", (req, res) => {
  todoModels.find({}).then((todosItem) => {
    res.json({todos: todosItem})
  })
  //res.send(JSON.stringify(todoItems))
  //res.send("Hello There")
})

/*
 input expected from user in body{
 title: string,
 description: string
 }
  */
app.post("/todos", (req, res) => {
  const bodyParas = req.body
  const validateBodyParas = newTodo.safeParse(bodyParas);
  if (!validateBodyParas.success) {
    res.status(404).json({
      msg: "Kindly input the correct inputs"
    })
    return;
  }
  else {
    //do mongoDB data entry 

    todoModels.create({
      title: bodyParas.title,
      description: bodyParas.description,
      isComplete: false
    }).then((pro) => {
      res.json({ msg: "Data entered sucessfully" })

    })
  }
})

app.put("/complete", (req, res) => {
  const bodyPars = req.body;
  const validateBodyParas = updateTodos.safeParse(bodyPars);
  console.log(validateBodyParas);
  if (!validateBodyParas.success) {
    res.status(404).json({
      msg: "Please enter a valid Id"
    })
    return;

  } else {
    todoModels.findOneAndUpdate({
      _id: req.body.id
    }, {
      isComplete: true
    }).then((val) => {
      res.json({
        msg: "Todo Completed"
      })
    })
  }
})

app.listen(3000, () => {
  console.log("server is up")
});




























