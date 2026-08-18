import "./ApplicationDetails.css";
import type { Application } from "../../types/Application";

type ApplicationDetailsProps = {
  application: Application;
  onClose: () => void;
};

function ApplicationDetails({ application, onClose }: ApplicationDetailsProps) {
  return (
    <div className="details-backdrop" onClick={onClose}>
      <div className="details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="details-header">
          <div>
            <p className="details-company">{application.company}</p>
            <h2>{application.position}</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="details-grid">
          <div className="details-item">
            <span className="details-label">Location</span>
            <span>{application.location || "-"}</span>
          </div>
          <div className="details-item">
            <span className="details-label">Date Applied</span>
            <span>{application.applicationDate || "-"}</span>
          </div>
          <div className="details-item">
            <span className="details-label">Status</span>
            <span className={`status-badge status-${application.status}`}>
              {application.status}
            </span>
          </div>
        </div>
        <div className="details-section">
          <span className="details-label">Job URL</span>

          {application.jobUrl ? (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="details-link"
            >
              Open job posting ↗
            </a>
          ) : (
            <span>—</span>
          )}
        </div>

        <div className="details-section">
          <span className="details-label">Notes</span>

          <div className="details-notes">
            {application.notes || "No notes added."}
          </div>
        </div>

        <div className="details-actions">
          <button className="details-secondary-button" disabled>
            Edit
          </button>

          <button className="details-delete-button" disabled>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;
