import { useState, useEffect } from "react";
import type { Application } from "./types/Application";

function App() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/applications')
    .then(response => response.json())
    .then(data => setApplications(data))
  }, []);

  return (
    <div>
      <h1>Job Applications</h1>
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