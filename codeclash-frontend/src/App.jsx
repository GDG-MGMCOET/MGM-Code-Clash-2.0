import React from "react";
import Register from "./pages/Register";
import LandingPage from "./pages/landingPage";
import Winners from "./pages/Winners";
import Tracks from "./pages/Tracks";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const REGISTRATION_DEADLINE = new Date("2026-04-15T10:00:00+05:30");

const RegisterRoute = () => {
  if (Date.now() >= REGISTRATION_DEADLINE.getTime()) {
    return <Navigate to="/" replace />;
  }
  return <Register />;
};

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterRoute />} />  
          <Route path="/winners" element={<Winners />} />
          <Route path="/tracks" element={<Tracks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
