import "./ApplicationForm.css";
import type { Application } from "../../types/Application";
import { useState } from "react";

type ApplicationFormProps = {
  onClose: () => void;
  onApplicationAdded: (application: Application) => void;
  onSuccess: () => void;
  onError: () => void;
};

function ApplicationForm({
  onClose,
  onApplicationAdded,
  onSuccess,
  onError,
}: ApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/applications", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          company,
          position,
          location,
          applicationDate,
          jobUrl,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add application");
      }

      const newApplication: Application = await response.json();
      onApplicationAdded(newApplication);
      onClose();
      onSuccess();
    } catch (error) {
      console.error(error);
      onClose();
      onError();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Add Application</h2>
          <button className="modal-close-button" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-grid">
            <div className="form-field">
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="date"
                placeholder="Application Date"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
              />
              <input
                type="url"
                placeholder="Job URL"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
              />
              <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button className="submit-button" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
