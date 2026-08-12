import "./StatCard.css";

function StatCard({ title, value, icon, description }) {
  return (
    <div className="stat-card">

      <div className="stat-card-content">
        <p>{title}</p>

        <h2>{value}</h2>

        {description && (
          <span>{description}</span>
        )}
      </div>

      <div className="stat-card-icon">
        {icon}
      </div>

    </div>
  );
}

export default StatCard;