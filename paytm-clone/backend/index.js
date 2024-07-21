const express = require("express")
const port = 3000;
const app = express()

app.get('/', (req, res) => {
  res.send("Server is running peacefully ")
})

app.listen(3000, () => {
  console.log("Server is up")
})

app.get("/signin", (req, res) => {
  res.send("SignIn Route")
})


app.get("/signup", (req, res) => {
  res.send("SignUp Route")
})
