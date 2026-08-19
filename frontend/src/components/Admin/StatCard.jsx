function StatCard({
  title,
  value,
  icon,
  description,
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-info">

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {description}
        </small>

      </div>

      <div className="stat-card-icon">
        {icon}
      </div>

    </div>
  );
}

export default StatCard;