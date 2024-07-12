import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  ListItemIcon,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import TaskItem from "./Taskitem";

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "gray",
  "& .MuiTableCell-head": {
    color: "white",
    fontWeight: "bold",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TaskList = ({ tasks, onTaskSelect, onDelete }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDeleteSingle = (taskId) => {
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
        onDelete(taskId);
      }
    });
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "All") {
      return true;
    }
    return task.status === statusFilter;
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0px",
          float: "right",
        }}
      >
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Todo">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        {filteredTasks?.length > 0 ? (
          <StyledTable>
            <StyledTableHead>
              <StyledTableRow>
                <TableCell align="center">Sr No</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </StyledTableRow>
            </StyledTableHead>
            <TableBody>
              {filteredTasks.map((task, index) => (
                <StyledTableRow
                  key={task._id}
                  onClick={() => handleTaskClick(task)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    {task.status === "Done" ? (
                      <ListItemIcon>
                        <DoneIcon style={{ color: "green" }} />
                      </ListItemIcon>
                    ) : (
                      <Typography variant="body2">{task.status}</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">{task.title}</TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">{task.description}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Grid container spacing={1} justifyContent="center">
                      <Grid item>
                        <IconButton
                          aria-label="edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTaskSelect(task);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSingle(task._id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        ) : (
          <Typography
            variant="body1"
            align="center"
            style={{ padding: "20px" }}
          >
            No tasks found.
          </Typography>
        )}
      </TableContainer>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
        {/* <DialogTitle>{selectedTask?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            <strong>Status:</strong> {selectedTask?.status}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {selectedTask?.description}
          </Typography>
        </DialogContent> */}
        <TaskItem
          open={isDialogOpen}
          task={selectedTask}
          onClose={handleCloseDialog}
        />
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </Dialog>
    </>
  );
};

export default TaskList;
