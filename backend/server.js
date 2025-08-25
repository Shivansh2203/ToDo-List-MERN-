require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const Task = require("./models/Task");

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

connectDB();

const cors = require("cors");
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// POST
app.post("/tasks", async (req, res) => {
  try {
    // create new task from request body
    const task = new Task({ text: req.body.text });

    //save taks in DB
    await task.save();

    // send the saved task back as response
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated task
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted ✅" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
