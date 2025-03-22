import React, { useState, useEffect } from "react";
import axios from "axios";

const ContestsWithLinks = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://clist.by/api/v2/contest/", {
          params: {
            username: "hsp12", // Replace with your Clist username
            api_key: "901f776b5275e09893757943d56916ca31b05580",   // Replace with your Clist API key
            upcoming: "true",
            order_by: "start",
          },
        });

        setContests(response.data.objects);
        setLoading(false);
      } catch (err) {
        setError("Error fetching contests from Clist API");
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return <div>Loading contests...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Contests</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Platform</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{contest.event}</td>
              <td className="px-4 py-2">{contest.resource.name}</td>
              <td className="px-4 py-2">
                {new Date(contest.start).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                {Math.round(contest.duration / 3600)} hours
              </td>
              <td className="px-4 py-2">
                <a
                  href={contest.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Contest
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContestsWithLinks;
