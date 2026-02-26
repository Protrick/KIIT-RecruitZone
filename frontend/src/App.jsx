import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import AuthPage from "./components/Authpage";
import Internship from "./pages/Internships";
import PrepareInterview from "./pages/Interview";
import DSAProblems from "./pages/Dsa";

function App() {
  // temporarily force authentication so routes render during development
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard/jobs" element={<Jobs />} />
            <Route path="/dashboard/internships" element={<Internship />} />
            <Route path="/dashboard/prepare-interview" element={<PrepareInterview />} />
            {/*<Route path="/dashboard/prepare-interview/:category" element={<DSAProblems />} /> */}
            <Route path="/problems" element={<DSAProblems />} />

          </Routes>
        </>
      ) : (
        <AuthPage onLogin={() => setIsAuthenticated(true)} />
      )}
    </Router>
  );
}

export default App;