export default function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Campus home">
        <span className="brand-mark" aria-hidden="true">C</span>
        <span>Campus<span className="brand-light">.admin</span></span>
      </a>
      <div className="topbar-label">STUDENT MANAGEMENT</div>
      <div className="profile" aria-label="Administrator profile">
        <span className="profile-avatar">A</span>
        <span className="profile-name">Administrator</span>
      </div>
    </header>
  );
}
