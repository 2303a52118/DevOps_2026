import StudentCard from "./StudentCard.jsx";

export default function StudentList({ students, onView, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">⌕</span>
        <h3>No students found</h3>
        <p>Try changing your search or branch filter.</p>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th scope="col">ROLL NUMBER</th>
            <th scope="col">STUDENT NAME</th>
            <th scope="col">BRANCH</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
