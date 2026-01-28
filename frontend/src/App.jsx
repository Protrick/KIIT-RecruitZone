// import EventCard from "./EventCard"
// import Navbar from "./Navbar"
// import CompanyCard from "./CompanyCard"

// function App() {
  
//   return (
//     <>
//       <Navbar />
//       <CompanyCard />
//       <EventCard />
//     </>
//   )
// }

// export default App


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Companies from "./Companies";
import Events from "./Events";
import Admin from "./Admin";
import Job from "./components/Job";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/jobs" element={<Job />} />
      </Routes>
    </Router>
  );
}

export default App;
