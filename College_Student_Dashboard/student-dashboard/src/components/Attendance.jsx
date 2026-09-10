function Attendance({ percentage }) {
  const eligible = percentage >= 75;

  return (
    <div className="attendance-widget">

      <div
        className="attendance-ring"
        style={{
          "--percentage": `${percentage * 3.6}deg`,
        }}
      >
        <div className="attendance-inner">
          <strong>{percentage}%</strong>
          <span>Overall</span>
        </div>
      </div>

      <span
        className={
          eligible
            ? "attendance-status eligible"
            : "attendance-status not-eligible"
        }
      >
        {eligible ? "Eligible" : "Not Eligible"}
      </span>

    </div>
  );
}

export default Attendance;