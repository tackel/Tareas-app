import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [task, setTask] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await fetch(`https://serene-gorge-75620.herokuapp.com/tasks/${id}`, {
        method: "DELETE",
      }); // aca lo elimino de backend

      setTask(task.filter((task) => task.id !== id)); //lo elimino del front, el filtar deja de cada task el que se distinto al id pasado, asi se elimina el que seleccione
    } catch (error) {
      console.error(error);
    }
  };

  const loadTask = async () => {
    const response = await fetch(
      "https://serene-gorge-75620.herokuapp.com/tasks"
    );
    const data = await response.json();
    setTask(data);
  };

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <>
      <h1>Task List</h1>
      {task.map((t) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
          key={t.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography color="orangered">{t.title} </Typography>
              <Typography color="white">{t.description} </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/tasks/${t.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(t.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
