import React, { useState, useEffect } from "react";
import CompanyCard from "./Companycard";
import companiesData from "./data/Companies.json";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setCompanies(companiesData);
  }, []);

  return (
    <div className="p-6 flex flex-wrap">
      {companies.map((company, index) => (
        <CompanyCard key={index} company={company} />
      ))}
    </div>
  );
};

export default Companies;
