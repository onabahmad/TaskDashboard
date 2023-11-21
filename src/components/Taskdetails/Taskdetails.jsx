import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Taskdetails.css";

const Taskdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const status = new URLSearchParams(window.location.search).get("status");

  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
  const initialTask = storedTasks[id] || {
    // title: "Task Title",
    description: "Task Description",
    status: status || "notStarted",
  };

  const [title, setTitle] = useState(initialTask.title);
  const [description, setDescription] = useState(initialTask.description);
  const [taskStatus, setTaskStatus] = useState(initialTask.status);
  useEffect(() => {
    const updatedTasks = {
      ...storedTasks,
      [id]: { title, description, status: taskStatus },
    };
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }, [id, title, description, taskStatus]);

  const handleDelete = () => {
    // Deleting the task from local storage
    const updatedTasks = { ...storedTasks };
    delete updatedTasks[id];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    navigate("/");
  };

  const handleSave = () => {
    navigate("/");
  };

  return (
    <div className="task-details-container">
      <h2>Task Details</h2>
      <p className="card-number">Card Number-{id}</p>
      <label className="label">Title:</label>
      <input
        type="text"
        className="input"
        placeholder="TITLE"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="label">Status:</label>
      <select
        className="select"
        value={taskStatus}
        onChange={(e) => setTaskStatus(e.target.value)}
      >
        <option value="notStarted">Not Started</option>
        <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <label className="label">Description:</label>
      <textarea
        className="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default Taskdetails;
