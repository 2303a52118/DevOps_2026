function ExamDetails({ exams }) {
  return (
    <div className="exam-list">

      {exams.map((exam) => (

        <div
          className="exam-item"
          key={exam.code}
        >

          <div className="exam-date">

            <strong>
              {exam.date.split(" ")[0]}
            </strong>

            <span>
              {exam.date.split(" ")[1]}
            </span>

          </div>

          <div className="exam-info">

            <strong>
              {exam.subject}
            </strong>

            <span>
              {exam.code} • {exam.day} • {exam.time}
            </span>

            <small>
              📍 {exam.room}
            </small>

          </div>

          <span className="exam-arrow">
            →
          </span>

        </div>

      ))}

    </div>
  );
}

export default ExamDetails;