import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./components/Authpage";
import Internship from "./pages/Internships";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {/* Authentication temporarily disabled for development */}
      {isAuthenticated ? (
        <>
          <Routes>
            <Route path="/" element={<Dashboard />} />
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