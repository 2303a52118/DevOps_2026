export default function StudentCard({ student, onView, onEdit, onDelete }) {
  return (
    <tr>
      <td><span className="roll-number">{student.rollNo}</span></td>
      <td>
        <button className="student-name" type="button" onClick={() => onView(student)}>
          {student.name}
        </button>
      </td>
      <td><span className="branch-pill">{student.branch}</span></td>
      <td className="actions-cell">
        <button className="icon-button view-action" type="button" onClick={() => onView(student)} aria-label={`View ${student.name}`} title="View details">
          View
        </button>
        <button className="icon-button edit-action" type="button" onClick={() => onEdit(student)} aria-label={`Edit ${student.name}`} title="Edit student">
          Edit
        </button>
        <button className="icon-button delete-action" type="button" onClick={() => onDelete(student)} aria-label={`Delete ${student.name}`} title="Delete student">
          Delete
        </button>
      </td>
    </tr>
  );
}
