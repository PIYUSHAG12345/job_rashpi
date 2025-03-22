import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/companies")
      .then(response => setCompanies(response.data))
      .catch(error => console.error("Error fetching companies:", error));
  }, []);

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map(company => (
          <li key={company._id}>
            <Link to={`/companies/${company._id}`}>{company.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesPage;