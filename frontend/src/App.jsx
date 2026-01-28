import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import AuthPage from "./components/Authpage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </>
      ) : (
        <AuthPage onLogin={() => setIsAuthenticated(true)} />
      )}
    </Router>
  );
}

export default App;