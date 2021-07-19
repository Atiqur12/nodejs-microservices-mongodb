const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://atiqur:stay_away@cluster0.kgwm9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })

const admin=new mongoose.model("admin",new mongoose.Schema({
  name:String,
  email:String,
  phone:String,
  password:String
}))
const customer=new mongoose.model("customer",new mongoose.Schema({
  name:String,
  email:String,
  phone:String,
  password:String
}))
const ordered=new mongoose.model("ordered",new mongoose.Schema({
  customer:String,
  order:String,
  price:String,
}))

const notification=new mongoose.model("notification",new mongoose.Schema({
  order:String,
  message:String,
}))

const delivered=new mongoose.model("delivered",new mongoose.Schema({
  product:String,
  customer:String,
}))

module.exports={
  admin,customer,ordered,notification,delivered
}