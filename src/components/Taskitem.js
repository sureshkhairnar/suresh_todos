import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const TaskItem = ({ open, onClose, task }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {task.title}
        <Grid container spacing={1} justifyContent="flex-end"></Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          <strong>Status: </strong>
          {task.status === "Done" ? (
            <DoneIcon style={{ color: "green", marginBottom: "-5px" }} />
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
