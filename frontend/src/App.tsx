import { useState, useEffect } from "react";
import type { Application } from "./types/Application";
import "./App.css";

import StatCard from "./components/StatCard";

function App() {

  const [applications, setApplications] = useState<Application[]>([]);

  const totalApplications = applications.length;

  const interviewingApplications = applications.filter(
    application => application.status === 'INTERVIEWING'
  ).length;

  const offers = applications.filter(
    application => application.status === 'OFFERED'
  ).length;

  const rejectedApplications = applications.filter(
    application => application.status === 'REJECTED'
  ).length;

  useEffect(() => {
    fetch('http://localhost:8080/api/applications')
    .then(response => response.json())
    .then(data => setApplications(data))
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Application Tracker</h1>
        </div>
        <button className="add-application-button">Add Application</button>
      </header>
      
      <section className="stats-grid">
        <StatCard title="Total Applications" value={totalApplications} />
        <StatCard title="Interviewing" value={interviewingApplications} />
        <StatCard title="Offers" value={offers} />
        <StatCard title="Rejected" value={rejectedApplications} />
      </section>


      {applications.map(application => (
        <div key={application.id}>
          <p>{application.company}</p>
          <p>{application.location}</p>
          <p>{application.position}</p>
          <p>{application.status}</p>
        </div>
      ))}

    </div>
  )
}

export default App;