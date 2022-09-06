const mongoose = require('mongoose')
const schema = mongoose.Schema;

let menuSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: Boolean,
      required: true,
    },
    menuUrl: {
      type: String,
      required: true
    },
    entryDate: {
      type: Date,
      default:Date.now  
    }
  })

  let usersSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    pwd: {
      type: Boolean,
      required: true
    },
    entryDate: {
      type: Date,
      default:Date.now  
    }
  })
  

  let menu =  module.exports = mongoose.model('menu', menuSchema, 'menu')
  let users =  module.exports = mongoose.model('users', usersSchema, 'users')

  let mySchemas = {
        'menu' : menu,
        'users' : users
  }

  module.exports = mySchemas