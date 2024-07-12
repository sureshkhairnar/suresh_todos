import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  // deleteAllTasks,
} from "./api/Api";
import TaskForm from "./components/Taskform";
import TaskList from "./components/Tasklist";
import { Container, Typography, Grid } from "@mui/material";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    getAllTasks()
      .then((response) => {
        const sortedTasks = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleCreateTask = (newTask) => {
    createTask(newTask)
      .then((response) => {
        const sortedTasks = [response.data, ...tasks].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTasks(sortedTasks);
        setSelectedTask(null);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask._id, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task._id === updatedTask._id ? response.data : task
        );
        const sortedTasks = updatedTasks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTasks(sortedTasks);
        setSelectedTask(null);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then(() => {
        const filteredTasks = tasks.filter((task) => task._id !== id);
        setTasks(filteredTasks);
        setSelectedTask(null);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  // const handleAllDeleteTasks = () => {
  //   deleteAllTasks()
  //     .then(() => {
  //       setTasks([]);
  //       setSelectedTask(null);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting task:", error);
  //     });
  // };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Task Management
      </Typography>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} md={8}>
          <TaskForm
            onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
            selectedTask={selectedTask}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TaskList
            tasks={tasks}
            onTaskSelect={handleTaskSelect}
            onDelete={handleDeleteTask}
            // onAllDelete={handleAllDeleteTasks}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
