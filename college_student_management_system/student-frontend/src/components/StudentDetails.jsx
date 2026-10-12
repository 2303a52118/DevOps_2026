export default function StudentDetails({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="details-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close details">×</button>
        <div className="details-avatar" aria-hidden="true">{student.name.charAt(0).toUpperCase()}</div>
        <p className="eyebrow">STUDENT PROFILE</p>
        <h2 id="details-title">{student.name}</h2>
        <p className="details-subtitle">Complete student information</p>
        <dl className="details-list">
          <div><dt>Roll number</dt><dd>{student.rollNo}</dd></div>
          <div><dt>Branch</dt><dd>{student.branch}</dd></div>
          <div><dt>Student ID</dt><dd>#{student.id}</dd></div>
        </dl>
        <button className="primary-button details-done" type="button" onClick={onClose}>Done</button>
      </section>
    </div>
  );
}
