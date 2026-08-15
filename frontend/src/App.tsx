import { useState, useEffect } from "react";
import type { Application } from "./types/Application";
import "./App.css";

import Toast from "./components/Toast/Toast";
import StatCard from "./components/StatCard";
import ApplicationTable from "./components/ApplicationTable";
import ApplicationForm from "./components/ApplicationForm/ApplicationForm";

function App() {

  const [applications, setApplications] = useState<Application[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

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
        <button className="add-application-button" 
        onClick={() => setShowForm(true)}
        >
          Add Application
        </button>
      </header>
      
      <section className="stats-grid">
        <StatCard title="Total Applications" value={totalApplications} />
        <StatCard title="Interviewing" value={interviewingApplications} />
        <StatCard title="Offers" value={offers} />
        <StatCard title="Rejected" value={rejectedApplications} />
      </section>

      <ApplicationTable applications={applications} />

      {showForm && (
        <ApplicationForm
          onClose={() => setShowForm(false)}
          onApplicationAdded={(newApplication) => {
            setApplications((currentApplications) => [
              ...currentApplications,
              newApplication,
            ]);
          }}
          onSuccess={() =>
            showToast("Application submitted", "success")
          }
          onError={() =>
            showToast("Application failed to submit", "error")
          }
        />
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
        />
      )}
    </div>
  );
}

export default App;