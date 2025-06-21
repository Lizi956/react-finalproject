import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Register from "./components/Register";
import Login from "./components/Login";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import "./App.css";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <Movies />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <PrivateRoute>
              <MovieDetails />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
