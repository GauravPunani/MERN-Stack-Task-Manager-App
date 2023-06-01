import React, { useEffect, useState } from "react";
import authApi from "../../axios-interceptor";
import constants from "../../constants/endpoints";
import { Alert, Box, Grid, Modal, Pagination, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchTasks, searchTask } from "./tasksSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditTaskModal from "../../components/editTaskModal/EditTaskModal";

const Tasks = () => {
  const [isAddModalOpen, setAddModal] = useState(false);
  const [editModalData, setEditModalData] = useState({
    title: "",
    description: "",
  });
  const [searchText, setsearchText] = useState("");
  const [isEditModalOpen, setisEditModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);
  console.log("tasks in component>>>>>>>>>", tasks);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const handleDelete = (taskId) => {
    console.log("taskId", taskId);
    dispatch(deleteTask(taskId));
  };

  const handleSubmit = async () => {
    if (title === "" || description === "")
      return setError("title or description cannot be empty");

    const data = {
      title,
      description,
    };

    dispatch(addTask(data));
    setAddModal(false);
    setError(null);
  };

  const handleEditTask = (taskData) => {
    console.log("task data here>>>>>>>>>>>", taskData);

    setEditModalData({
      ...editModalData,
      id: taskData._id,
      title: taskData.title,
      description: taskData.description,
    });

    console.log("edit modal data here>>>>>>>>>>>", editModalData);
    console.log("edit modal data 2nd time>>>>>>>>>>>", editModalData);
    setisEditModalOpen(true);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      const query = { searchText };
      dispatch(fetchTasks(query));
    }, 300);

    return () => {
      console.log("interval cleard");
      clearInterval(interval);
    };
  }, [searchText]);

  const handlePaginationChange = (event, value) => {
    console.log("value is", value);
    const query = {
      offset: (value - 1) * tasks.limit,
    };
    dispatch(fetchTasks(query));
  };

  return (
    <>
      {/* main container  */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          mt: 2,
        }}
      >
        {/* add task modal  */}
        <Modal
          open={isAddModalOpen}
          onClose={() => setAddModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Add Task
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <Box sx={{ mt: 3 }}>
                <TextField
                  onChange={(event) => setTitle(event.target.value)}
                  sx={{ width: "100%" }}
                  id="outlined-error"
                  label="title"
                />
              </Box>
              <Box sx={{ mt: 3, mb: 3 }}>
                <TextField
                  multiline
                  rows={3}
                  onChange={(event) => setDescription(event.target.value)}
                  sx={{ width: "100%" }}
                  id="outlined-error"
                  label="description"
                />
              </Box>
              <Button onClick={handleSubmit} variant="contained">
                Create Task
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* edit task modal  */}
        <EditTaskModal
          setisEditModalOpen={setisEditModalOpen}
          setOpen={isEditModalOpen}
          editTaskData={editModalData}
        />

        {/* content container */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: 600,
            bgcolor: "background.paper",
            p: 2,
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" textAlign="center" p={2}>
            Task Manager
          </Typography>

          {/* searchbar container */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TextField
              placeholder="Search title, description etc..."
              sx={{
                width: "100%",
              }}
              size="small"
              onChange={(event) => setsearchText(event.target.value)}
            ></TextField>
            <Button
              sx={{
                ml: 1,
              }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddModal(true)}
            >
              Add
            </Button>
          </Box>

          {/* list container */}
          <Box
            sx={{
              maxHeight: "600px",
              overflow: "auto",
              mt: 2,
              mb: 2,
            }}
          >
            <List>
              {tasks.data.map((task) => {
                return (
                  <div key={task._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={task.title}
                        secondary={
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="p"
                              color="text.secondary"
                            >
                              {task.description}
                            </Typography>
                            <Box
                              sx={{
                                width: 210,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                              }}
                            >
                              <Button
                                onClick={() => handleDelete(task._id)}
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                              </Button>
                              <Button
                                onClick={() => handleEditTask(task)}
                                startIcon={<EditIcon />}
                                variant="contained"
                              >
                                Edit
                              </Button>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>

                    <Divider />
                  </div>
                );
              })}
            </List>
          </Box>

          {/* pagination container  */}
          <Box>
            <Pagination
              count={tasks.page}
              onChange={handlePaginationChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Tasks;
