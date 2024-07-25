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
import Swal from "sweetalert2";

const TaskForm = ({ onSubmit, selectedTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [isEditing, setIsEditing] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

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

  const validateForm = () => {
    let tempErrors = { title: "", description: "" };
    let isValid = true;

    const titleChars = title.split("").filter((char) => char.length > 0);
    const descriptionChars = description
      .split("")
      .filter((char) => char.length > 0);

    if (!title) {
      tempErrors.title = "Title is required.";
      isValid = false;
    } else if (titleChars.length < 5) {
      tempErrors.title = "Title must be at least 5 chars long.";
      isValid = false;
    } else if (titleChars.length > 100) {
      tempErrors.title = "Title must be at most 100 chars long.";
      isValid = false;
    }

    if (!description) {
      tempErrors.description = "Description is required.";
      isValid = false;
    } else if (descriptionChars.length < 10) {
      tempErrors.description = "Description must be at least 10 chars long.";
      isValid = false;
    } else if (descriptionChars.length > 500) {
      tempErrors.description = "Description must be at most 500 chars long.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    validateTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    validateDescription(e.target.value);
  };

  const validateTitle = (value) => {
    const titleChars = value.split("").filter((char) => char.length > 0);
    let titleError = "";
    if (!value) {
      titleError = "Title is required.";
    } else if (titleChars.length < 5) {
      titleError = "Title must be at least 5 chars long.";
    } else if (titleChars.length > 100) {
      titleError = "Title must be at most 100 chars long.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, title: titleError }));
  };

  const validateDescription = (value) => {
    const descriptionChars = value.split("").filter((char) => char.length > 0);
    let descriptionError = "";
    if (!value) {
      descriptionError = "Description is required.";
    } else if (descriptionChars.length < 10) {
      descriptionError = "Description must be at least 10 chars long.";
    } else if (descriptionChars.length > 500) {
      descriptionError = "Description must be at most 500 chars long.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: descriptionError,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const action = selectedTask ? "update" : "create";

    onSubmit({ ...selectedTask, title, description, status });

    Swal.fire({
      title: action === "create" ? "To-Do Created" : "To-Do Updated",
      text:
        action === "create"
          ? "Your to-do has been created successfully."
          : "Your to-do has been updated successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });

    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Todo");
    setIsEditing(false);
    setErrors({ title: "", description: "" });
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
