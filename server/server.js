const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
//   const result = await pool.query('SELECT NOW()');

  res.send('Home page of TaskFlow application');
});

// CREATE TASK
app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;

    const newTask = await pool.query(
      'INSERT INTO tasks(title) VALUES($1) RETURNING *',
      [title]
    );

    res.json(newTask.rows[0]);

  } catch (error) {
    console.log(error.message);
  }
});

// Get all tasks
app.get('/tasks',async(req, res)=>{
  try {
    const allTasks = await pool.query(
      'SELECT * FROM tasks ORDER BY id DESC'
    );

    res.json(allTasks.rows)
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(5000, () => {
  console.log('Server running on port 5000');
});