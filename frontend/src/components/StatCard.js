function StatCard({
  title,
  value,
  icon,
  color = '#1f2937'
}) {

  return (

    <div
      className="card stat-card"
      style={{
        borderLeft: `6px solid ${color}`
      }}
    >

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <h2>
          {value}
        </h2>

        <p>
          {title}
        </p>

      </div>

    </div>
  );
}

export default StatCard;