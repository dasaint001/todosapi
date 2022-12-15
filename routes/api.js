const express = require('express');
const router = express.Router();
const Todo = require('../models/todos')

// Get all Todos
router.get('/todos', async (req, res) => {
  //this will return all the data, exposing only the id and todo field to the client
  try {
    const todos = await Todo.find()
    if (!todos) {
      return res.status(400).json({
        success: false,
        message: 'Todos not retrieved',
        todos: []
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Todos retrieved successfully',
      todos: todos
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
});


// Create a Todo
router.post('/todos', async (req, res) => {
  try {
    const { todo, userId } = req.body
    const todos = await Todo.create({todo, userId})
    if (!todos) {
      return res.status(400).json({
      success: false,
      message: 'Problem creating Todo',
      todo: null
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Successfully created Todo',
      todo: todos
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
})


// Update a Todo
router.put('/todos/:id', async (req, res) => {
  try {
    const { todo } = req.body
    const update = await Todo.findOneAndUpdate({_id: req.params.id}, {todo})
    if (!update) {
      return res.status(400).json({
        success: false,
        message: 'Not successfully updated'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Todo successfully updated'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
})


// Delete a Todo
router.delete('/todos/:id', async (req, res) => {
  try {
    const deleteTodo = await Todo.findOneAndDelete({_id: req.params.id})
    if (!deleteTodo) {
      return res.status(400).json({
        success: false,
        message: 'Todo not deleted'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Todo successfully deleted'
    })
  } catch (error){
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

//get todo
router.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.find({_id: req.params.id})
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Todo retrieved successfully',
      todo: todo
    })
  } catch (error){
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
})


module.exports = router;