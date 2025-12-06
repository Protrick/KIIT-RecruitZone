import React, { useState } from "react";

const Admin = () => {
  const [company, setCompany] = useState({ name: "", description: "", date: "" });
  const [event, setEvent] = useState({ title: "", description: "", society: "", date: "" });

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    console.log("Company Added:", company);
    alert("Company added successfully!");
    setCompany({ name: "", description: "", date: "" });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    console.log("Event Added:", event);
    alert("Event added successfully!");
    setEvent({ title: "", description: "", society: "", date: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Company</h2>
        <form onSubmit={handleCompanySubmit} className="space-y-2">
          <input type="text" placeholder="Company Name" value={company.name} onChange={(e)=>setCompany({...company, name:e.target.value})} className="border p-2 rounded w-full"/>
          <input type="text" placeholder="Description" value={company.description} onChange={(e)=>setCompany({...company, description:e.target.value})} className="border p-2 rounded w-full"/>
          <input type="date" value={company.date} onChange={(e)=>setCompany({...company, date:e.target.value})} className="border p-2 rounded w-full"/>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Company</button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Add Event</h2>
        <form onSubmit={handleEventSubmit} className="space-y-2">
          <input type="text" placeholder="Event Title" value={event.title} onChange={(e)=>setEvent({...event, title:e.target.value})} className="border p-2 rounded w-full"/>
          <input type="text" placeholder="Description" value={event.description} onChange={(e)=>setEvent({...event, description:e.target.value})} className="border p-2 rounded w-full"/>
          <input type="text" placeholder="Society Name" value={event.society} onChange={(e)=>setEvent({...event, society:e.target.value})} className="border p-2 rounded w-full"/>
          <input type="date" value={event.date} onChange={(e)=>setEvent({...event, date:e.target.value})} className="border p-2 rounded w-full"/>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
