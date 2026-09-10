function StudentProfile({ student }) {
  return (
    <div className="panel profile-panel">

      <div className="panel-header">

        <div>
          <h2>My Profile</h2>
          <p>Personal information</p>
        </div>

        <button className="edit-button">
          Edit
        </button>

      </div>

      <div className="profile-user">

        <div className="profile-avatar">
          SP
        </div>

        <div>
          <h3>{student.name}</h3>

          <p>{student.email}</p>

          <span className="active-badge">
            ● Active Student
          </span>
        </div>

      </div>

      <div className="profile-grid">

        <div>
          <span>Roll Number</span>
          <strong>{student.rollNumber}</strong>
        </div>

        <div>
          <span>Branch</span>
          <strong>{student.branch}</strong>
        </div>

        <div>
          <span>Year</span>
          <strong>{student.year}</strong>
        </div>

        <div>
          <span>Semester</span>
          <strong>{student.semester}</strong>
        </div>

      </div>

    </div>
  );
}

export default StudentProfile;