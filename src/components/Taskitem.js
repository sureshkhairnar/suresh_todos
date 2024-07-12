import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import Swal from "sweetalert2";

const TaskItem = ({ open, onClose, task, onEdit, onDelete, onTaskSelect }) => {
  if (!task) return null;

  const handleEdit = () => {
    onTaskSelect(task);
    onEdit();
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Delete Task?",
      text: "Are you sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(task._id);
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {task.title}
        <Grid container spacing={1} justifyContent="flex-end">
          <Grid item>
            <IconButton aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          <strong>Status: </strong>
          {task.status === "Done" ? (
            <DoneIcon style={{ color: "green" }} />
          ) : (
            task.status
          )}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong>
          <br />
          {task.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskItem;
