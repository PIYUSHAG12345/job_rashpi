import React, { useState, useEffect } from "react";
import axios from "axios";

const CodeforcesAPI = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Codeforces problems
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://codeforces.com/api/problemset.problems"
        );
        setProblems(response.data.result.problems.slice(0, 20)); // Fetch first 20 problems
        setLoading(false);
      } catch (err) {
        setError("Error fetching data from Codeforces API");
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div>Loading problems...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Codeforces Problems</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Index</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{problem.index}</td>
              <td className="px-4 py-2">
                <a
                  href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {problem.name}
                </a>
              </td>
              <td className="px-4 py-2">
                {problem.rating ? problem.rating : "Unknown"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeforcesAPI;
