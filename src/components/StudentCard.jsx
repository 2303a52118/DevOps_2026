function StudentCard({ student, onViewProfile }) {
  const eligible = student.attendance >= 75;

  const initials = student.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="directory-card">

      <div className="directory-top">

        <div className="directory-avatar">
          {initials}
        </div>

        <span
          className={
            eligible
              ? "status-dot eligible-dot"
              : "status-dot danger-dot"
          }
        ></span>

      </div>

      <h3>{student.name}</h3>

      <span className="directory-roll">
        {student.rollNumber}
      </span>

      <span className="directory-branch">
        {student.branch}
      </span>

      <div className="directory-bottom">

        <div>
          <span>Attendance</span>

          <strong
            className={
              eligible
                ? "good"
                : "warning"
            }
          >
            {student.attendance}%
          </strong>
        </div>

        <button
          onClick={() => onViewProfile(student)}
        >
          View
        </button>

      </div>

    </div>
  );
}

export default StudentCard;