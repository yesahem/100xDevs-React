const mongoose = require('mongoose')

try {
  mongoose.connect('mongodb+srv://ahemraj82:Pbq7nzug0TXWy80g@paytm-backend.joqxp8h.mongodb.net/paytm-backend');
  console.log("Inside try catch ")
} catch (err) {
  console.log(err)
}
const userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  isLoggedIn: Boolean,

})

const User = mongoose.model('Users', userSchema)
console.log("Outside")
console.log(User)


module.exports = {
  User
}
