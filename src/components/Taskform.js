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
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    let tempErrors = {};
    if (!title) tempErrors.title = "Title is required.";
    if (!description) tempErrors.description = "Description is required.";
    if (!status) tempErrors.status = "Status is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...selectedTask, title, description, status });
      clearForm();
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Todo");
    setIsEditing(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    }
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
                fullWidth
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                error={!!errors.title}
                helperText={errors.title}
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
                onChange={handleDescriptionChange}
                error={!!errors.description}
                helperText={errors.description}
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
                error={!!errors.status}
                helperText={errors.status}
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
