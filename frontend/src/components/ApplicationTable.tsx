import type { Application } from "../types/Application";

type ApplicationTableProps = {
    applications: Application[];
    onApplicationClick: (application: Application) => void;
};

function ApplicationTable({ applications, onApplicationClick }: ApplicationTableProps) {
    return (
        <section className="application-section">
            <h2>Applications</h2>

            <table className="application-table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Location</th>
                        <th>Application Date</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map(application => (
                        <tr 
                        key={application.id}
                        onClick={() => onApplicationClick(application)}
                        className="application-row"
                        >
                            <td>{application.company}</td>
                            <td>{application.position}</td>
                            <td>{application.location}</td>
                            <td>{application.applicationDate || "-"}</td>
                            <td>
                                <span className={`status-badge status-${application.status}`}>
                                    {application.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default ApplicationTable;
