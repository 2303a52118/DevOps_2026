function Header({ student }) {
  return (
    <header className="topbar">

      <div className="mobile-brand">
        <div className="brand-logo">S</div>
        <strong>SRU Portal</strong>
      </div>

      <div className="topbar-right">

        <button className="notification">
          ♢
          <span></span>
        </button>

        <div className="topbar-divider"></div>

        <div className="user-menu">

          <div className="user-avatar">
            SP
          </div>

          <div className="user-info">
            <strong>{student.name}</strong>
            <span>{student.rollNumber}</span>
          </div>

          <span className="chevron">
            ▾
          </span>

        </div>

      </div>

    </header>
  );
}

export default Header;