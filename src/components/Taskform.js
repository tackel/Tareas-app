import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); // cansela el refresh que sucese al presionar el boton save
    try {
      if (editing) {
        await fetch(
          `https://serene-gorge-75620.herokuapp.com/tasks/${params.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
          }
        );
      } else {
        await fetch("https://serene-gorge-75620.herokuapp.com/tasks", {
          method: "POST",
          body: JSON.stringify(task), // hay que pasar el task como string
          headers: { "Content-Type": "application/json" }, // con esto el programa entiene qu queres mandar un json
        });
      }

      setLoading(false);
      navigate("/"); // para al guardar la tarea redireccione al inicio
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const loadTask = async (id) => {
    const res = await fetch(
      `https://serene-gorge-75620.herokuapp.com/tasks/${id}`
    );
    const data = await res.json();
    console.log(data);
    setTask({ title: data.title, description: data.description });
    setEditing(true);
  };
  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ marginTop: 5 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            {editing ? "Edit Task" : "Create Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField // son los imput
                variant="filled"
                label="Write your title"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="title"
                value={task.title}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Write yout description"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="description"
                value={task.description}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit" //el submit es para que al papretar el boton se ejecute el formulario que lo contiene
                disabled={!task.title || !task.description} // desabilitarlo cuando este enviando los datos, si no hay uan tarea o una description
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Guardar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
