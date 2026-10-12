import { useEffect, useState } from "react";

const emptyStudent = { name: "", rollNo: "", branch: "" };

export default function StudentForm({ student, onSubmit, onCancel, busy }) {
  const [form, setForm] = useState(student || emptyStudent);

  useEffect(() => {
    setForm(student || emptyStudent);
  }, [student]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      name: form.name.trim(),
      rollNo: form.rollNo.trim(),
      branch: form.branch.trim().toUpperCase(),
    });
  }

  const editing = Boolean(student);

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div className="form-icon" aria-hidden="true">{editing ? "✎" : "+"}</div>
        <div>
          <h2>{editing ? "Edit student" : "Add a student"}</h2>
          <p>{editing ? "Update the student's information." : "Enter the student's details below."}</p>
        </div>
      </div>

      <label htmlFor="student-name">Student name</label>
      <input
        id="student-name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="e.g. Rahul Sharma"
        value={form.name}
        onChange={handleChange}
        maxLength={80}
        required
      />

      <label htmlFor="student-roll">Roll number</label>
      <input
        id="student-roll"
        name="rollNo"
        type="text"
        placeholder="e.g. CSE103"
        value={form.rollNo}
        onChange={handleChange}
        maxLength={30}
        required
      />

      <label htmlFor="student-branch">Branch</label>
      <input
        id="student-branch"
        name="branch"
        type="text"
        placeholder="e.g. CSE"
        value={form.branch}
        onChange={handleChange}
        maxLength={30}
        required
      />

      <div className="form-actions">
        {editing && <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>}
        <button className="primary-button submit-button" type="submit" disabled={busy}>
          {busy ? "Saving…" : editing ? "Save changes" : "Add student"}
          {!busy && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </form>
  );
}
