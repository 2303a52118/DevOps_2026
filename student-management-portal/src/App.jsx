import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  MapPin,
  Search,
  UsersRound,
} from 'lucide-react'
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import './App.css'

const students = [
  { id: '101', name: 'Rahul Sharma', branch: 'Computer Science', shortBranch: 'CSE', year: 'III', email: 'rahul.sharma@northstar.edu', gpa: '3.82', status: 'Active', color: 'mint', courses: ['CS 301', 'CS 214', 'MATH 240'] },
  { id: '102', name: 'Maya Patel', branch: 'Mechanical Engineering', shortBranch: 'ME', year: 'II', email: 'maya.patel@northstar.edu', gpa: '3.94', status: 'Active', color: 'rose', courses: ['ME 220', 'PHYS 202', 'MATH 240'] },
  { id: '103', name: 'Aarav Iyer', branch: 'Business Administration', shortBranch: 'BUS', year: 'IV', email: 'aarav.iyer@northstar.edu', gpa: '3.67', status: 'Active', color: 'blue', courses: ['BUS 410', 'ECON 305', 'STAT 210'] },
  { id: '104', name: 'Ananya Rao', branch: 'Biological Sciences', shortBranch: 'BIO', year: 'I', email: 'ananya.rao@northstar.edu', gpa: '3.76', status: 'Active', color: 'gold', courses: ['BIO 110', 'CHEM 101', 'STAT 210'] },
  { id: '105', name: 'Ishaan Mehta', branch: 'Computer Science', shortBranch: 'CSE', year: 'III', email: 'ishaan.mehta@northstar.edu', gpa: '3.51', status: 'On leave', color: 'lilac', courses: ['CS 301', 'CS 214'] },
  { id: '106', name: 'Diya Nair', branch: 'Psychology', shortBranch: 'PSY', year: 'II', email: 'diya.nair@northstar.edu', gpa: '3.89', status: 'Active', color: 'peach', courses: ['PSY 205', 'BIO 110', 'STAT 210'] },
]

const courses = [
  { id: 'cs-301', code: 'CS 301', title: 'Human-Centered Computing', department: 'Computer Science', instructor: 'Prof. Elena Moore', students: 34, capacity: 40, room: 'Innovation Hall 204', schedule: 'Mon, Wed · 10:30 AM', color: 'mint', description: 'Explore the principles behind intuitive, inclusive digital products through research, prototyping, and collaborative studio work.' },
  { id: 'bio-110', code: 'BIO 110', title: 'The Living World', department: 'Biological Sciences', instructor: 'Dr. Sana Okafor', students: 28, capacity: 32, room: 'Kepler Science 118', schedule: 'Tue, Thu · 9:00 AM', color: 'rose', description: 'A field-to-lab introduction to the systems, patterns, and processes that shape living organisms.' },
  { id: 'bus-410', code: 'BUS 410', title: 'Responsible Leadership', department: 'Business', instructor: 'Prof. Marcus Lee', students: 22, capacity: 30, room: 'Founders Building 301', schedule: 'Mon, Wed · 1:00 PM', color: 'blue', description: 'Build practical leadership skills for creating resilient organizations with a positive impact.' },
  { id: 'math-240', code: 'MATH 240', title: 'Applied Statistics', department: 'Mathematics', instructor: 'Dr. Nina Chen', students: 31, capacity: 36, room: 'Kepler Science 206', schedule: 'Tue, Thu · 11:00 AM', color: 'gold', description: 'Learn to turn data into defensible insight using probability, statistical models, and clear communication.' },
]

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/students', label: 'Students', icon: UsersRound },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/about', label: 'About', icon: GraduationCap },
]

function AppShell() {
  const location = useLocation()
  const section = location.pathname.startsWith('/students')
    ? 'Students'
    : location.pathname.startsWith('/courses')
      ? 'Courses'
      : location.pathname === '/about'
        ? 'About'
        : 'Overview'

  return (
    <div className="portal-shell">
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="Northstar College home">
          <span className="brand-mark"><GraduationCap size={21} strokeWidth={2.2} /></span>
          <span><strong>northstar</strong><small>COLLEGE PORTAL</small></span>
        </Link>
        <div className="sidebar-label">CAMPUS</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === 'Students' && <span className="nav-count">248</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="term-card">
            <span className="term-icon"><CalendarDays size={16} /></span>
            <span><small>ACADEMIC TERM</small><strong>Fall 2026</strong></span>
            <span className="term-dot" />
          </div>
          <div className="profile-row">
            <span className="avatar avatar-ink">AM</span>
            <span className="profile-copy"><strong>Alex Morgan</strong><small>Administrator</small></span>
            <ChevronRight size={16} className="profile-chevron" />
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="breadcrumb"><span>Northstar College</span><ChevronRight size={14} /><strong>{section}</strong></div>
          <div className="topbar-meta"><span className="today-label">Thursday, October 8</span><span className="term-pill"><span /> Fall semester</span></div>
        </header>
        <main className="page-content"><Outlet /></main>
        <footer className="page-footer"><span>Northstar College <span className="footer-dot">·</span> Student Services</span><span>Academic year 2026–27</span></footer>
      </div>
    </div>
  )
}

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>
      {action && <div className="heading-action">{action}</div>}
    </div>
  )
}

function StatCard({ label, value, change, icon: Icon, tone }) {
  return (
    <article className="stat-card">
      <div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={18} /></span></div>
      <div className="stat-value">{value}</div>
      <div className="stat-change"><span className="change-mark">↗</span>{change}</div>
    </article>
  )
}

function StudentAvatar({ student, size = '' }) {
  return <span className={`avatar avatar-${student.color} ${size}`}>{student.name.split(' ').map((part) => part[0]).join('')}</span>
}

function StudentRow({ student }) {
  return (
    <Link className="student-row" to={`/students/${student.id}`}>
      <StudentAvatar student={student} />
      <span className="student-row-main"><strong>{student.name}</strong><small>{student.email}</small></span>
      <span className="student-row-branch">{student.shortBranch}</span>
      <span className={`status-dot${student.status === 'On leave' ? ' muted' : ''}`}>{student.status}</span>
      <ArrowRight className="row-arrow" size={16} />
    </Link>
  )
}

function Home() {
  const featuredStudents = students.slice(0, 4)

  return (
    <div className="page-view home-view">
      <PageHeading eyebrow="THURSDAY, OCTOBER 8, 2026" title="Good morning, Alex" description="Here’s what’s happening across campus today." action={<Link className="button button-dark" to="/students"><UsersRound size={16} /> View students</Link>} />
      <section className="campus-banner" aria-label="Northstar College campus">
        <div className="banner-copy"><span className="banner-kicker"><span /> CAMPUS NOTES · OCTOBER 2026</span><h2>A new season<br />of possibility.</h2><p>One campus, 248 stories in motion. Find the people and programs shaping this term.</p><Link to="/about" className="banner-link">Explore Northstar <ArrowRight size={15} /></Link></div>
        <div className="banner-photo"><img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85" alt="University campus building framed by trees" /><span className="photo-caption"><MapPin size={13} /> Northstar campus · Est. 1968</span></div>
        <div className="banner-stamp">N<span>★</span></div>
      </section>

      <section className="stats-grid" aria-label="College statistics">
        <StatCard label="Enrolled students" value="248" change="12 added this term" icon={UsersRound} tone="mint" />
        <StatCard label="Active courses" value="18" change="Across 6 departments" icon={BookOpen} tone="coral" />
        <StatCard label="Average GPA" value="3.68" change="Up 0.08 from spring" icon={ChartNoAxesCombined} tone="blue" />
        <StatCard label="Retention rate" value="94%" change="4 points above target" icon={GraduationCap} tone="gold" />
      </section>

      <section className="dashboard-grid">
        <div className="panel recent-panel">
          <div className="panel-heading"><div><div className="eyebrow">YOUR COMMUNITY</div><h2>Recently enrolled</h2></div><Link className="text-link" to="/students">All students <ArrowRight size={15} /></Link></div>
          <div className="student-list">{featuredStudents.map((student) => <StudentRow key={student.id} student={student} />)}</div>
        </div>
        <div className="panel courses-panel">
          <div className="panel-heading"><div><div className="eyebrow">IN SESSION</div><h2>Course pulse</h2></div><Link className="icon-link" to="/courses" aria-label="View all courses"><ArrowRight size={17} /></Link></div>
          <div className="course-pulse-list">{courses.slice(0, 3).map((course) => <Link to={`/courses/${course.id}`} className="course-pulse" key={course.id}><span className={`course-code ${course.color}`}>{course.code}</span><span className="pulse-copy"><strong>{course.title}</strong><small>{course.students} of {course.capacity} seats filled</small></span><span className="pulse-track"><span style={{ width: `${(course.students / course.capacity) * 100}%` }} /></span></Link>)}</div>
          <Link className="panel-bottom-link" to="/courses">Browse course catalog <ArrowRight size={14} /></Link>
        </div>
      </section>
    </div>
  )
}

function StudentList() {
  const [query, setQuery] = useState('')
  const filteredStudents = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return students
    return students.filter((student) => [student.name, student.id, student.branch, student.email].some((value) => value.toLowerCase().includes(search)))
  }, [query])

  return (
    <div className="page-view">
      <PageHeading eyebrow="PEOPLE · 2026–27" title="Students" description="A directory of the people who make Northstar." action={<span className="student-total"><UsersRound size={16} /> 248 enrolled</span>} />
      <section className="directory-panel">
        <div className="directory-toolbar"><div><h2>Student directory</h2><p>{filteredStudents.length} profiles shown</p></div><label className="search-field"><Search size={17} /><input type="search" placeholder="Search by name, ID, or branch" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search students" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label></div>
        <div className="directory-head"><span>STUDENT</span><span>PROGRAM</span><span>STATUS</span><span /></div>
        <div className="directory-list">{filteredStudents.map((student) => <Link className="directory-row" key={student.id} to={`/students/${student.id}`}><StudentAvatar student={student} /><span className="directory-name"><strong>{student.name}</strong><small>{student.email} <span>· ID {student.id}</span></small></span><span className="program-label">{student.branch}<small>Year {student.year}</small></span><span className={`status-tag${student.status === 'On leave' ? ' status-muted' : ''}`}><i />{student.status}</span><ArrowRight size={16} className="row-arrow" /></Link>)}</div>
        {filteredStudents.length === 0 && <div className="empty-state"><Search size={22} /><strong>No students found</strong><span>Try a different name, ID, or program.</span></div>}
      </section>
      <p className="directory-note">Showing sample directory records. The complete roster contains 248 students.</p>
    </div>
  )
}

function BackButton({ fallback }) {
  const navigate = useNavigate()
  return <button className="back-button" type="button" onClick={() => navigate(-1, { fallback })}><ArrowLeft size={16} /> Back</button>
}

function StudentDetails() {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('StudentDetails mounted')
    return () => console.log('StudentDetails unmounted')
  }, [])

  useEffect(() => {
    let active = true
    setStudent(null)
    setError('')
    setLoading(true)
    const request = window.setTimeout(() => {
      const match = students.find((record) => record.id === id)
      if (!active) return
      if (match) setStudent(match)
      else setError(`No student with ID ${id} was found.`)
      setLoading(false)
    }, 420)
    return () => {
      active = false
      window.clearTimeout(request)
    }
  }, [id])

  if (loading) return <div className="page-view"><BackButton fallback="/students" /><div className="state-panel" role="status"><span className="spinner" /><strong>Loading student profile</strong><span>Finding the latest enrollment details…</span></div></div>
  if (error) return <div className="page-view"><BackButton fallback="/students" /><div className="state-panel state-error" role="alert"><span className="error-mark">!</span><strong>Student not found</strong><span>{error}</span><Link className="button button-dark" to="/students">Return to students</Link></div></div>

  return (
    <div className="page-view detail-view">
      <BackButton fallback="/students" />
      <PageHeading eyebrow={`STUDENT RECORD · ${student.id}`} title="Student profile" description="Enrollment details and academic standing." />
      <section className="profile-card">
        <div className="profile-banner"><span className="profile-banner-mark">N<span>★</span></span><span className="profile-status"><i /> {student.status}</span></div>
        <div className="profile-main"><StudentAvatar student={student} size="avatar-xl" /><div className="profile-name"><h2>{student.name}</h2><p>{student.branch} <span>·</span> Year {student.year}</p><a href={`mailto:${student.email}`}>{student.email}</a></div><span className="profile-id">ID <strong>{student.id}</strong></span></div>
        <div className="profile-facts"><div><span>PROGRAM</span><strong>{student.shortBranch}</strong><small>{student.branch}</small></div><div><span>YEAR</span><strong>{student.year}</strong><small>{student.year === 'I' ? 'First year' : student.year === 'II' ? 'Second year' : student.year === 'III' ? 'Third year' : 'Fourth year'}</small></div><div><span>CUMULATIVE GPA</span><strong>{student.gpa}</strong><small>Good academic standing</small></div></div>
        <div className="profile-courses"><div className="profile-section-heading"><div><div className="eyebrow">CURRENT TERM</div><h3>Enrolled courses</h3></div><span>{student.courses.length} courses</span></div><div className="enrolled-course-list">{student.courses.map((code) => { const course = courses.find((item) => item.code === code); return <Link className="enrolled-course" key={code} to={course ? `/courses/${course.id}` : '/courses'}><span className={`course-code ${course?.color ?? 'mint'}`}>{code}</span><span>{course?.title ?? 'Course details'}</span><ArrowRight size={15} /></Link> })}</div></div>
      </section>
    </div>
  )
}

function CourseList() {
  return (
    <div className="page-view">
      <PageHeading eyebrow="ACADEMICS · FALL 2026" title="Courses" description="Find your next class across Northstar’s departments." action={<span className="student-total"><BookOpen size={16} /> 18 active courses</span>} />
      <div className="course-grid">{courses.map((course) => <Link className="course-card" to={`/courses/${course.id}`} key={course.id}><div className={`course-card-art ${course.color}`}><span className="course-card-code">{course.code}</span><BookOpen size={23} strokeWidth={1.5} /></div><div className="course-card-body"><span className="eyebrow">{course.department}</span><h2>{course.title}</h2><p>{course.instructor}</p><div className="course-card-meta"><span><UsersRound size={14} /> {course.students} students</span><span>{course.schedule.split('·')[1]}</span></div><div className="capacity-bar"><span style={{ width: `${(course.students / course.capacity) * 100}%` }} /></div><div className="capacity-label">{course.capacity - course.students} seats remaining <ArrowRight size={15} /></div></div></Link>)}</div>
      <div className="catalog-note"><span><CalendarDays size={18} /></span><p><strong>Registration is open</strong><br />Add or update a course selection through the student services office.</p><span className="catalog-note-term">FALL 2026</span></div>
    </div>
  )
}

function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find((record) => record.id === id)
  const enrolledStudents = students.filter((student) => student.courses.includes(course?.code))

  useEffect(() => {
    console.log('CourseDetails mounted')
    return () => console.log('CourseDetails unmounted')
  }, [])

  if (!course) return <div className="page-view"><button className="back-button" type="button" onClick={() => navigate('/courses')}><ArrowLeft size={16} /> Back to courses</button><div className="state-panel state-error"><span className="error-mark">!</span><strong>Course not found</strong><span>No course with that code is in the current catalog.</span><Link className="button button-dark" to="/courses">Browse all courses</Link></div></div>

  return (
    <div className="page-view detail-view"><button className="back-button" type="button" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back</button><PageHeading eyebrow={`${course.department.toUpperCase()} · COURSE DETAILS`} title={course.title} description={`${course.code} · ${course.department}`} /><section className="course-detail-card"><div className={`course-detail-art ${course.color}`}><span>{course.code}</span><BookOpen size={30} /></div><div className="course-detail-content"><div className="eyebrow">FALL 2026 · COURSE OVERVIEW</div><p className="course-description">{course.description}</p><div className="course-facts"><div><span>INSTRUCTOR</span><strong>{course.instructor}</strong></div><div><span>MEETING TIME</span><strong>{course.schedule}</strong></div><div><span>LOCATION</span><strong>{course.room}</strong></div><div><span>ENROLLMENT</span><strong>{course.students} / {course.capacity} students</strong></div></div><div className="course-enrollment"><div><strong>Class capacity</strong><span>{course.capacity - course.students} seats available</span></div><div className="capacity-bar"><span style={{ width: `${(course.students / course.capacity) * 100}%` }} /></div></div></div></section><section className="panel roster-panel"><div className="panel-heading"><div><div className="eyebrow">CLASS ROSTER</div><h2>Enrolled students</h2></div><span className="roster-count">{enrolledStudents.length} profiles</span></div><div className="student-list">{enrolledStudents.map((student) => <StudentRow key={student.id} student={student} />)}</div></section></div>
  )
}

function About() {
  return (
    <div className="page-view about-view"><PageHeading eyebrow="OUR COLLEGE" title="About Northstar" description="A place to find your direction, and the people who help you get there." /><section className="about-intro"><div className="about-initial">N<span>★</span></div><div><span className="eyebrow">LEARN WITH PURPOSE · EST. 1968</span><h2>Big ideas grow<br />better together.</h2><p>Northstar College is an independent learning community where curiosity meets opportunity. We bring students, educators, and neighbors together to build a more thoughtful future.</p><Link to="/students" className="button button-dark">Meet our students <ArrowRight size={16} /></Link></div><div className="about-image"><img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=85" alt="Graduates celebrating together on campus" /></div></section><section className="about-values"><article><span className="value-number">01</span><h3>Stay curious</h3><p>We make room for good questions, new perspectives, and the lifelong practice of learning.</p></article><article><span className="value-number">02</span><h3>Build together</h3><p>Our strongest work happens when different experiences and disciplines meet.</p></article><article><span className="value-number">03</span><h3>Make it matter</h3><p>Knowledge is most powerful when it improves the world beyond our campus.</p></article></section></div>
  )
}

function NotFound() {
  return <div className="page-view not-found"><div className="not-found-number">404</div><div className="eyebrow">THIS PAGE IS OFF THE MAP</div><h1>Let’s find your way back.</h1><p>The page you’re looking for isn’t part of this campus.</p><Link to="/" className="button button-dark"><ArrowLeft size={16} /> Return to overview</Link></div>
}

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="students" element={<StudentList />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="courses" element={<CourseList />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
