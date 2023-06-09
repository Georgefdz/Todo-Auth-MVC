const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

//Router hears the request and sends it to the controller
router.get('/', ensureAuth, todosController.getTodos) //ensureAuth is a middleware function that checks if the user is authenticated (logged in)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router