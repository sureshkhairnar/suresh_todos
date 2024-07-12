import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const TaskForm = ({ onSubmit, selectedTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setStatus(selectedTask.status);
      setIsEditing(true);
    } else {
      clearForm();
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...selectedTask, title, description, status });
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Todo");
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          {isEditing ? "Edit Task" : "Create New Task"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                id="description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                id="status"
                label="Status"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Todo">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Update Task" : "Create Task"}
              </Button>
              {isEditing && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  style={{ marginLeft: "10px" }}
                  onClick={clearForm}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskForm;
