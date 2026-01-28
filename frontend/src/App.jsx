import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import AuthPage from "./components/Authpage";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {/* Authentication temporarily disabled for development */}
      {/* {isAuthenticated ? ( */}
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard/jobs" element={<Jobs />} />

          
          </Routes>
        </>
      {/* ) : (
        <AuthPage onLogin={() => setIsAuthenticated(true)} />
      )} */}
    </Router>
  );
}

export default App;