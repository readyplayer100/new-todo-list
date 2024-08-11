import React, { useEffect, useState } from "react";
import { Navigate, Link, Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import TodoMain from "./components/TodoMain";

const PrivateRoutes = () => {
  const location = useLocation()
  // 检查是否login
  console.error('userId===', sessionStorage.getItem('userId'));
  console.error('token===', sessionStorage.getItem('accessToken'));
  if (sessionStorage.getItem('accessToken') === null) {
    return (
      <Navigate to='/' state={{ redirectPath: location.pathname }} />
    )
  }
  return <Outlet />
}
const App = () => {
  return (
    <div className="App">
      <h1 className="todo-header">YOUR PERSONAL TODO-LIST MANAGER</h1>
      <div class="link-container">
        <Link to="/" className="link">Login</Link>
        <Link to="/Logout" className="link">Logout</Link>
        <Link to="/Register" className="link">Register</Link>
        <Link to="/Todo" className="link">Todo</Link>
      </div>
      <div className="linkSpacer"></div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/todo" element={<TodoMain />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App;