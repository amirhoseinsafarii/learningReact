import { Component } from "react";
import React from "react";
import Users from "./components/users";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import Navbar from "./components/navbar";
import User from "./components/user";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashbord from "./components/dashbord";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashbord" element={<Dashbord />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
