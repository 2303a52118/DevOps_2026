import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import StudentProfile from "./components/StudentProfile";
import SubjectList from "./components/SubjectList";
import Attendance from "./components/Attendance";
import ExamDetails from "./components/ExamDetails";
import StudentCard from "./components/StudentCard";
import Footer from "./components/Footer";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const student = {
    name: "Sravan Pochampally",
    rollNumber: "23B91A6601",
    branch: "CSE - AIML",
    year: "3rd Year",
    semester: "Semester 5",
    email: "sravan@student.sru.edu.in",
    phone: "+91 98765 43210",
    section: "A",
    admissionYear: "2023",
  };

  const subjects = [
    {
      code: "CS501",
      name: "Data Structures & Algorithms",
      faculty: "Dr. Rajesh Kumar",
      attendance: 88,
      grade: "A",
      credits: 4,
    },
    {
      code: "CS502",
      name: "Machine Learning",
      faculty: "Dr. Priya Sharma",
      attendance: 84,
      grade: "A",
      credits: 4,
    },
    {
      code: "CS503",
      name: "Database Management Systems",
      faculty: "Dr. Arun Kumar",
      attendance: 79,
      grade: "B+",
      credits: 3,
    },
    {
      code: "CS504",
      name: "Computer Networks",
      faculty: "Dr. Naveen Rao",
      attendance: 81,
      grade: "A-",
      credits: 3,
    },
    {
      code: "CS505",
      name: "Operating Systems",
      faculty: "Dr. Anil Reddy",
      attendance: 76,
      grade: "B+",
      credits: 4,
    },
    {
      code: "CS506",
      name: "Artificial Intelligence",
      faculty: "Dr. Kiran Rao",
      attendance: 85,
      grade: "A",
      credits: 3,
    },
  ];

  const exams = [
    {
      subject: "Data Structures & Algorithms",
      code: "CS501",
      date: "20 Sep 2026",
      day: "Saturday",
      time: "10:00 AM",
      room: "Block A • 204",
    },
    {
      subject: "Machine Learning",
      code: "CS502",
      date: "23 Sep 2026",
      day: "Tuesday",
      time: "10:00 AM",
      room: "Block B • 301",
    },
    {
      subject: "Database Management Systems",
      code: "CS503",
      date: "26 Sep 2026",
      day: "Friday",
      time: "02:00 PM",
      room: "Block A • 105",
    },
    {
      subject: "Computer Networks",
      code: "CS504",
      date: "29 Sep 2026",
      day: "Monday",
      time: "10:00 AM",
      room: "Block C • 202",
    },
  ];

  const students = [
    {
      name: "Sravan Pochampally",
      rollNumber: "23B91A6601",
      branch: "CSE - AIML",
      attendance: 82,
    },
    {
      name: "Rahul Kumar",
      rollNumber: "23B91A6602",
      branch: "CSE",
      attendance: 76,
    },
    {
      name: "Anil Kumar",
      rollNumber: "23B91A6603",
      branch: "ECE",
      attendance: 68,
    },
  ];

  const results = [
    {
      semester: "Semester 4",
      sgpa: "7.8",
      status: "Passed",
    },
    {
      semester: "Semester 3",
      sgpa: "7.6",
      status: "Passed",
    },
    {
      semester: "Semester 2",
      sgpa: "7.4",
      status: "Passed",
    },
    {
      semester: "Semester 1",
      sgpa: "7.2",
      status: "Passed",
    },
  ];

  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "My Profile", icon: "◎" },
    { name: "Academics", icon: "▦" },
    { name: "Attendance", icon: "◔" },
    { name: "Examinations", icon: "▤" },
    { name: "Results", icon: "▥" },
  ];

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
    setSelectedStudent(null);
  };

  return (
    <div className={darkMode ? "erp-layout dark" : "erp-layout"}>

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-logo">
            S
          </div>

          <div className="brand-text">
            <h2>SRU</h2>
            <span>Student Portal</span>
          </div>

        </div>

        <div className="menu-label">
          MAIN MENU
        </div>

        <nav>

          {menuItems.map((item) => (

            <button
              key={item.name}
              className={`menu-item ${
                activeMenu === item.name ? "active" : ""
              }`}
              onClick={() =>
                handleMenuChange(item.name)
              }
            >

              <span className="menu-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-help">

            <div className="help-icon">
              ?
            </div>

            <div>
              <strong>Need Help?</strong>
              <span>
                Contact administration
              </span>
            </div>

          </div>

          <button className="logout-button">
            ↪
            <span>Logout</span>
          </button>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

        </div>

      </aside>


      {/* ================= MAIN AREA ================= */}

      <div className="main-area">

        <Header student={student} />


        <main className="page-content">

          {/* ================= DASHBOARD ================= */}

          {activeMenu === "Dashboard" && (

            <>
              <div className="page-heading">

                <div>

                  <span className="eyebrow">
                    STUDENT OVERVIEW
                  </span>

                  <h1>
                    Good afternoon, Sravan 👋
                  </h1>

                  <p>
                    Here's an overview of your academic progress.
                  </p>

                </div>

                <div className="semester-selector">

                  <span>
                    Academic Year
                  </span>

                  <strong>
                    2026 - 2027 ▾
                  </strong>

                </div>

              </div>


              {/* Statistics */}

              <section className="stats">

                <div className="stat-card">

                  <div className="stat-top">
                    <span>Total Subjects</span>
                    <div className="stat-icon blue">
                      ▦
                    </div>
                  </div>

                  <strong className="stat-value">
                    06
                  </strong>

                  <span className="stat-caption">
                    Current semester
                  </span>

                </div>


                <div className="stat-card">

                  <div className="stat-top">
                    <span>Attendance</span>
                    <div className="stat-icon green">
                      ◔
                    </div>
                  </div>

                  <strong className="stat-value">
                    82%
                  </strong>

                  <span className="stat-caption positive">
                    ↑ 4.2% from last month
                  </span>

                </div>


                <div className="stat-card">

                  <div className="stat-top">
                    <span>Current CGPA</span>
                    <div className="stat-icon purple">
                      ★
                    </div>
                  </div>

                  <strong className="stat-value">
                    7.5
                  </strong>

                  <span className="stat-caption">
                    Out of 10.0
                  </span>

                </div>


                <div className="stat-card">

                  <div className="stat-top">
                    <span>Upcoming Exams</span>
                    <div className="stat-icon orange">
                      ▤
                    </div>
                  </div>

                  <strong className="stat-value">
                    04
                  </strong>

                  <span className="stat-caption">
                    Next exam in 10 days
                  </span>

                </div>

              </section>


              <section className="dashboard-columns">

                <div className="panel">

                  <div className="panel-header">

                    <div>
                      <h2>Attendance Overview</h2>
                      <p>
                        Semester attendance performance
                      </p>
                    </div>

                  </div>

                  <div className="attendance-layout">

                    <Attendance
                      percentage={82}
                    />

                    <div className="attendance-summary">

                      <div className="summary-row">
                        <span>Present</span>
                        <strong>82%</strong>
                      </div>

                      <div className="bar">
                        <div
                          className="bar-fill"
                          style={{ width: "82%" }}
                        />
                      </div>

                      <div className="summary-row">
                        <span>Required</span>
                        <strong>75%</strong>
                      </div>

                      <div className="bar required">
                        <div
                          className="bar-fill"
                          style={{ width: "75%" }}
                        />
                      </div>

                      <div className="attendance-alert">

                        <span>✓</span>

                        <div>
                          <strong>
                            Attendance requirement met
                          </strong>

                          <p>
                            You are 7% above the minimum requirement.
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>


                <StudentProfile
                  student={student}
                />

              </section>


              <section className="panel">

                <div className="panel-header">

                  <div>
                    <h2>Current Subjects</h2>
                    <p>
                      Your registered subjects
                    </p>
                  </div>

                  <button
                    className="outline-button"
                    onClick={() =>
                      handleMenuChange("Academics")
                    }
                  >
                    View All →
                  </button>

                </div>

                <SubjectList
                  subjects={subjects}
                />

              </section>

            </>

          )}


          {/* ================= PROFILE ================= */}

          {activeMenu === "My Profile" && (

            <section>

              <PageTitle
                title="My Profile"
                subtitle="View and manage your personal information"
              />

              <div className="profile-page">

                <div className="profile-banner">

                  <div className="profile-avatar-large">
                    SP
                  </div>

                  <div>
                    <h2>{student.name}</h2>

                    <p>
                      {student.branch} • {student.year}
                    </p>

                    <span className="active-badge">
                      ● Active Student
                    </span>
                  </div>

                  <button className="primary-button">
                    Edit Profile
                  </button>

                </div>


                <div className="profile-information">

                  <InfoItem
                    label="Full Name"
                    value={student.name}
                  />

                  <InfoItem
                    label="Roll Number"
                    value={student.rollNumber}
                  />

                  <InfoItem
                    label="Email"
                    value={student.email}
                  />

                  <InfoItem
                    label="Phone"
                    value={student.phone}
                  />

                  <InfoItem
                    label="Branch"
                    value={student.branch}
                  />

                  <InfoItem
                    label="Section"
                    value={student.section}
                  />

                  <InfoItem
                    label="Year"
                    value={student.year}
                  />

                  <InfoItem
                    label="Admission Year"
                    value={student.admissionYear}
                  />

                </div>

              </div>

            </section>

          )}


          {/* ================= ACADEMICS ================= */}

          {activeMenu === "Academics" && (

            <section>

              <PageTitle
                title="Academics"
                subtitle="Subjects, faculty and academic performance"
              />

              <div className="academic-summary">

                <SummaryBox
                  title="Semester"
                  value="5"
                  subtitle="Current semester"
                />

                <SummaryBox
                  title="Subjects"
                  value="06"
                  subtitle="Registered subjects"
                />

                <SummaryBox
                  title="Credits"
                  value="21"
                  subtitle="Current semester"
                />

                <SummaryBox
                  title="CGPA"
                  value="7.5"
                  subtitle="Overall"
                />

              </div>

              <div className="panel">

                <div className="panel-header">

                  <div>
                    <h2>Subject Performance</h2>
                    <p>
                      Current semester academic details
                    </p>
                  </div>

                </div>

                <SubjectList
                  subjects={subjects}
                />

              </div>

            </section>

          )}


          {/* ================= ATTENDANCE ================= */}

          {activeMenu === "Attendance" && (

            <section>

              <PageTitle
                title="Attendance"
                subtitle="Track your attendance across all subjects"
              />

              <div className="attendance-page-top">

                <div className="attendance-big-card">

                  <Attendance
                    percentage={82}
                  />

                  <div>
                    <h2>
                      82%
                    </h2>

                    <p>
                      Overall Attendance
                    </p>

                    <span className="eligible">
                      ✓ Eligible for examination
                    </span>
                  </div>

                </div>

                <SummaryBox
                  title="Minimum Required"
                  value="75%"
                  subtitle="University requirement"
                />

                <SummaryBox
                  title="Attendance Buffer"
                  value="+7%"
                  subtitle="Above minimum"
                />

              </div>


              <div className="panel">

                <div className="panel-header">

                  <div>
                    <h2>Subject-wise Attendance</h2>
                    <p>
                      Attendance percentage by subject
                    </p>
                  </div>

                </div>

                <div className="attendance-subject-list">

                  {subjects.map((subject) => (

                    <div
                      className="attendance-subject"
                      key={subject.code}
                    >

                      <div>
                        <strong>
                          {subject.name}
                        </strong>

                        <span>
                          {subject.code} • {subject.faculty}
                        </span>
                      </div>

                      <div className="attendance-progress">

                        <div className="progress-track">

                          <div
                            className={
                              subject.attendance >= 75
                                ? "progress-good"
                                : "progress-danger"
                            }
                            style={{
                              width: `${subject.attendance}%`,
                            }}
                          />

                        </div>

                        <strong>
                          {subject.attendance}%
                        </strong>

                      </div>

                      <span
                        className={
                          subject.attendance >= 75
                            ? "eligible"
                            : "not-eligible"
                        }
                      >
                        {subject.attendance >= 75
                          ? "Eligible"
                          : "Shortage"}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </section>

          )}


          {/* ================= EXAMINATIONS ================= */}

          {activeMenu === "Examinations" && (

            <section>

              <PageTitle
                title="Examinations"
                subtitle="Upcoming and scheduled examinations"
              />

              <div className="academic-summary">

                <SummaryBox
                  title="Upcoming"
                  value="04"
                  subtitle="Examinations"
                />

                <SummaryBox
                  title="First Exam"
                  value="20"
                  subtitle="September 2026"
                />

                <SummaryBox
                  title="Eligibility"
                  value="Yes"
                  subtitle="Based on attendance"
                />

              </div>


              <div className="panel">

                <div className="panel-header">

                  <div>
                    <h2>Examination Schedule</h2>
                    <p>
                      Semester 5 examination timetable
                    </p>
                  </div>

                  <button className="outline-button">
                    Download PDF
                  </button>

                </div>

                <ExamDetails
                  exams={exams}
                />

              </div>

            </section>

          )}


          {/* ================= RESULTS ================= */}

          {activeMenu === "Results" && (

            <section>

              <PageTitle
                title="Results"
                subtitle="Academic results and semester performance"
              />

              <div className="result-highlight">

                <div>

                  <span>
                    CURRENT CGPA
                  </span>

                  <strong>
                    7.5
                  </strong>

                  <p>
                    Out of 10.0
                  </p>

                </div>

                <div className="result-message">
                  <strong>
                    Good Academic Standing
                  </strong>

                  <p>
                    Keep working consistently to improve your CGPA.
                  </p>
                </div>

              </div>


              <div className="panel">

                <div className="panel-header">

                  <div>
                    <h2>Semester Results</h2>
                    <p>
                      Previous semester performance
                    </p>
                  </div>

                </div>

                <div className="results-table">

                  <div className="results-header">
                    <span>SEMESTER</span>
                    <span>SGPA</span>
                    <span>STATUS</span>
                    <span>ACTION</span>
                  </div>

                  {results.map((result) => (

                    <div
                      className="results-row"
                      key={result.semester}
                    >

                      <strong>
                        {result.semester}
                      </strong>

                      <span className="sgpa">
                        {result.sgpa}
                      </span>

                      <span className="passed">
                        ✓ {result.status}
                      </span>

                      <button className="view-result">
                        View Result →
                      </button>

                    </div>

                  ))}

                </div>

              </div>

            </section>

          )}

        </main>

        <Footer />

      </div>

    </div>
  );
}


/* ==============================
   REUSABLE COMPONENTS
============================== */

function PageTitle({ title, subtitle }) {
  return (
    <div className="page-heading simple-heading">

      <div>
        <span className="eyebrow">
          SR UNIVERSITY
        </span>

        <h1>{title}</h1>

        <p>{subtitle}</p>
      </div>

    </div>
  );
}


function InfoItem({ label, value }) {
  return (
    <div className="info-item">

      <span>{label}</span>

      <strong>{value}</strong>

    </div>
  );
}


function SummaryBox({ title, value, subtitle }) {
  return (
    <div className="summary-box">

      <span>{title}</span>

      <strong>{value}</strong>

      <small>{subtitle}</small>

    </div>
  );
}

export default App;