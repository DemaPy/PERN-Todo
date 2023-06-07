const express = require("express")
const app = express()
const cors = require('cors')
const pool = require('./db')
const PORT = 5000

app.use(cors())
app.use(express.json())


app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body
        const todo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])
        res.status(200).json(todo.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo")
        res.status(200).json(todos.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/todo/:id', async (req, res) => {
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id])
        res.status(200).json(todo.rows)
    } catch (error) {
        console.log(error)
    }
})

app.put('/todo/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const updateTodo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *", [description, id])
        res.status(200).json(updateTodo.rows)
    } catch (error) {
        console.log(error)
    }
})

app.delete('/todo/:id', async (req, res) => {
    try {
        const {id} = req.params
        const updateTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1 RETURNING *", [id])
        res.status(200).json(updateTodo.rows)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log('Server has been started.')
})