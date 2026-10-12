import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import StudentDetails from "./components/StudentDetails.jsx";
import StudentForm from "./components/StudentForm.jsx";
import StudentList from "./components/StudentList.jsx";
import { createStudent, deleteStudent, getStudents, updateStudent } from "./api.js";

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    getStudents({ signal: controller.signal })
      .then(setStudents)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const branches = useMemo(
    () => [...new Set(students.map((student) => student.branch))].sort(),
    [students],
  );
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch = !query ||
        student.name.toLowerCase().includes(query) ||
        student.rollNo.toLowerCase().includes(query);
      return matchesSearch && (!branch || student.branch === branch);
    });
  }, [students, search, branch]);

  async function handleSave(student) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (editingStudent) {
        const updated = await updateStudent(editingStudent.id, student);
        setStudents((current) => current.map((item) => item.id === updated.id ? updated : item));
        setNotice(`${updated.name}’s information was updated.`);
        setEditingStudent(null);
      } else {
        const created = await createStudent(student);
        setStudents((current) => [...current, created]);
        setNotice(`${created.name} was added successfully.`);
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(student) {
    if (!window.confirm(`Delete ${student.name} (${student.rollNo})? This action cannot be undone.`)) return;
    setError("");
    setNotice("");
    try {
      await deleteStudent(student.id);
      setStudents((current) => current.filter((item) => item.id !== student.id));
      setNotice(`${student.name} was deleted.`);
      if (selectedStudent?.id === student.id) setSelectedStudent(null);
      if (editingStudent?.id === student.id) setEditingStudent(null);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">
        <section className="page-intro">
          <div className="intro-copy-wrap">
            <span className="title-badge">Academic dashboard</span>
            <p className="eyebrow">Campus directory</p>
            <h1>Student management</h1>
            <p className="intro-copy">Keep your student records organized, searchable, and ready for every semester.</p>
          </div>
          <div className="total-card-group">
            <div className="total-card" aria-live="polite">
              <span className="total-icon" aria-hidden="true">▤</span>
              <span><strong>{students.length}</strong><small>Total students</small></span>
            </div>
            <div className="mini-trend">
              <span className="trend-up">↗</span>
              <span>+12% this term</span>
            </div>
          </div>
        </section>

        <section className="insight-row" aria-label="Student insights">
          <div className="stat-card">
            <span className="stat-label">Active branches</span>
            <strong>{branches.length}</strong>
            <small>Across campus</small>
          </div>
          <div className="stat-card">
            <span className="stat-label">Matched results</span>
            <strong>{filteredStudents.length}</strong>
            <small>Current filters</small>
          </div>
          <div className="stat-card highlight-card">
            <span className="stat-label">Student health</span>
            <strong>Excellent</strong>
            <small>Records up to date</small>
          </div>
        </section>

        {notice && <div className="alert success-alert" role="status"><span>✓</span>{notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}
        {error && <div className="alert error-alert" role="alert"><span>!</span>{error}<button type="button" onClick={() => setError("")} aria-label="Dismiss error">×</button></div>}

        <section className="dashboard-grid">
          <section className="panel directory-panel" aria-labelledby="directory-title">
            <div className="panel-heading">
              <div>
                <h2 id="directory-title">Student directory</h2>
                <p>Browse and manage your college students.</p>
              </div>
              <span className="result-count">{filteredStudents.length} {filteredStudents.length === 1 ? "student" : "students"}</span>
            </div>

            <div className="filters">
              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  aria-label="Search students"
                  placeholder="Search by name or roll number..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <label className="filter-select">
                <span className="sr-only">Filter by branch</span>
                <select value={branch} onChange={(event) => setBranch(event.target.value)}>
                  <option value="">All branches</option>
                  {branches.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <span aria-hidden="true">⌄</span>
              </label>
            </div>

            {loading ? (
              <div className="loading-state" role="status"><span className="spinner" />Loading students…</div>
            ) : (
              <StudentList
                students={filteredStudents}
                onView={setSelectedStudent}
                onEdit={setEditingStudent}
                onDelete={handleDelete}
              />
            )}
          </section>

          <aside className="panel form-panel">
            <StudentForm
              key={editingStudent?.id || "new-student"}
              student={editingStudent}
              onSubmit={handleSave}
              onCancel={() => setEditingStudent(null)}
              busy={busy}
            />
          </aside>
        </section>
        <footer className="page-footer">Campus Student Management <span>·</span> Student records at a glance</footer>
      </main>
      <StudentDetails student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
}
