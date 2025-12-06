import React from "react";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 m-2 w-64">
      <h2 className="text-xl font-bold">{company.name}</h2>
      <p className="text-gray-600">{company.description}</p>
      <p className="text-sm text-gray-500">Date: {company.date}</p>
    </div>
  );
};

export default CompanyCard;
