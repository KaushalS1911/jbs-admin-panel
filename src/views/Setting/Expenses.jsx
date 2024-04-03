import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  List,
  ListItem,
  Grid,
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";

function Expenses() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: new Date().getTime() },
      ]);
    } else {
      const updatedTodos = todos.map((todo) =>
        todo.id === editedId ? { ...todo, val: inputVal } : todo
      );
      setTodos(updatedTodos);
      setIsEdited(false);
      setEditedId(null);
    }
    setInputVal("");
  };

  const onDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleDone = (id) => {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(updated);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInputVal(todoToEdit.val);
    setIsEdited(true);
    setEditedId(id);
  };

  return (
    <>
      <MainCard>
        <Grid container direction={"column"}>
          <Grid item sx={{ marginBottom: "10px" }}>
            <TextField
              variant="outlined"
              size="small"
              onChange={onChange}
              label="Expenses"
              value={inputVal}
              In={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              size="small"
              sx={{
                width: { xs: "150px" },
                marginLeft: "10px",
                display: "block",
                backgroundColor: "#5559CE",
                color: "#EDE7F6",
              }}
              variant={isEdited ? "outlined" : "contained"}
              color="primary"
              onClick={handleClick}
              disabled={!inputVal}
            >
              {isEdited ? "Edit Expenses" : "Add Expenses"}
            </Button>
          </Grid>
        </Grid>

        <List>
          {todos.map((todo) => (
            <ListItem divider key={todo.id} >
              <Checkbox
                onClick={() => handleDone(todo.id)}
                checked={todo.isDone}
              />
              <Typography style={{ color: todo.isDone ? "green" : "" }}>
                {todo.val}
              </Typography>
              <Button onClick={() => handleEdit(todo.id)} 
              sx={{margin:'0 10px',backgroundColor:'#ede7f6',color:'#5559CE'}}>
                Edit
              </Button>
              <Button
                onClick={() => onDelete(todo.id)}
                color="secondary"
                variant="contained"
                sx={{margin:'0 10px'}}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </MainCard>
    </>
  );
}

export default Expenses;
