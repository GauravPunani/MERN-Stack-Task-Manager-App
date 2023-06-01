import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, Modal, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { editTask } from "../../features/tasks/tasksSlice";

const EditTaskModal = ({ setOpen, editTaskData, setisEditModalOpen }) => {
  const [newdata, setNewdata] = useState({
    title: editTaskData.title,
    description: editTaskData.description,
  });

  const { id: taskId } = editTaskData;

  const dispatch = useDispatch();

  useEffect(() => {
    setNewdata({
      title: editTaskData.title,
      description: editTaskData.description,
    });
  }, [editTaskData]);

  const handleSubmit = () => {
    dispatch(
      editTask({
        ...newdata,
        taskId,
      })
    );
    setisEditModalOpen(false);
  };

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

  return (
    <Modal
      open={setOpen}
      onClose={() => setisEditModalOpen(false)}
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
            Edit Task
          </Typography>
          {/* {error && <Alert severity="error">{error}</Alert>} */}
          <Box sx={{ mt: 3 }}>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-error"
              label="title"
              value={newdata.title}
              onChange={(event) =>
                setNewdata({
                  ...newdata,
                  title: event.target.value,
                })
              }
            />
          </Box>
          <Box sx={{ mt: 3, mb: 3 }}>
            <TextField
              multiline
              rows={3}
              sx={{ width: "100%" }}
              id="outlined-error"
              label="description"
              value={newdata.description}
              onChange={(event) =>
                setNewdata({
                  ...newdata,
                  description: event.target.value,
                })
              }
            />
          </Box>
          <Button onClick={handleSubmit} variant="contained">
            Edit Task
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
