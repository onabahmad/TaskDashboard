import React from "react";
import Home from "./components/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Taskdetails from "./components/Taskdetails/Taskdetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the home page */}
        <Route exact path="/" element={<Home />} />
        {/* Route for the task details page */}
        <Route path="/task/:id" element={<Taskdetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
