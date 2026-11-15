// Row 2 · JSX (className, closed tags, one root)
// Row 4 · Displaying data — title/tagline come from site.js via props, rendered inside { }
// Row 7 · Responding to events — onReport is PASSED (onClick={onReport}), not called.
export default function Hero({ title, tagline, onReport }) {
  function handleMyReports() {
    alert('My Reports page arrives with the router on Sat 14');
  }

  return (
    <section className="hero">
      <div className="container">
        <h1>{title}: report it, we route it.</h1>
        <p>{tagline}</p>
        <div className="hero-actions">
          <button className="btn" onClick={onReport}>Report an Issue</button>
          <button className="btn btn-outline-secondary" onClick={handleMyReports}>My Reports</button>
        </div>
      </div>
    </section>
  );
}
