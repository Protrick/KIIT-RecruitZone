import React, { useState, useEffect } from "react";
import CompanyCard from "../components/Companycard";
import companiesData from "../data/Companies.json";
import axios from "axios";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/companies")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map((company) => ({
            name: company.companyName,
            description: Array.isArray(company.roles) ? company.roles.join(", ") : company.roles,
            date: new Date(company.driveDate).toLocaleDateString(),
          }));
          setCompanies(mapped);
        } else {
          setCompanies(companiesData);
        }
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setCompanies(companiesData);
      });
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
