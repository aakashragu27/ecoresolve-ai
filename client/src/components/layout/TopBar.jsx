// Row 5 · Conditional rendering — Login button OR "Hi, {name}" + Logout, driven by isLoggedIn.
export default function TopBar({ isLoggedIn, user, onLogin, onLogout }) {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a className="logo" href="#">🌿 EcoResolve AI</a>
        <nav className="nav" aria-label="Main">
          <a href="#">Home</a>
          <a href="#report">Report an Issue</a>
          <a href="#my-reports">My Reports</a>
          <a href="#contact">Contact</a>
          {isLoggedIn ? (
            <>
              <span className="greeting">Hi, {user.name}</span>
              <button className="btn btn-sm btn-outline" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <button className="btn btn-sm" onClick={onLogin}>Login</button>
          )}
        </nav>
      </div>
    </header>
  );
}
