function SubjectList({ subjects }) {
  return (
    <div className="subjects-table">

      <div className="table-header">
        <span>SUBJECT</span>
        <span>FACULTY</span>
        <span>ATTENDANCE</span>
        <span>GRADE</span>
      </div>

      {subjects.map((subject) => {

        const attendanceGood = subject.attendance >= 75;

        return (
          <div
            className="table-row"
            key={subject.code}
          >

            <div className="subject-cell">

              <div className="subject-code">
                {subject.code}
              </div>

              <div>
                <strong>{subject.name}</strong>
                <span>Semester 5</span>
              </div>

            </div>

            <span className="faculty">
              {subject.faculty}
            </span>

            <div className="attendance-cell">

              <div className="mini-progress">
                <div
                  style={{
                    width: `${subject.attendance}%`,
                  }}
                ></div>
              </div>

              <strong
                className={
                  attendanceGood
                    ? "good"
                    : "warning"
                }
              >
                {subject.attendance}%
              </strong>

            </div>

            <span className="grade">
              {subject.grade}
            </span>

          </div>
        );
      })}

    </div>
  );
}

export default SubjectList;