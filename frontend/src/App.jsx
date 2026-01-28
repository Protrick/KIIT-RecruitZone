import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Companies from "./Companies";
import Events from "./Events";
import Admin from "./Admin";
import AuthPage from "./components/AuthPage";

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