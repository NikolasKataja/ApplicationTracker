type StatCardProps = {
  title: string;
  value: number;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <p className="stat-card-title">{title}</p>
      <p className="stat-card-value">{value}</p>
    </div>
  );
}

export default StatCard;