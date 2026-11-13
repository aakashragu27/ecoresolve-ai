// Row 1 · a small nested component that only reads a prop.
export default function Footer({ year }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>EcoResolve AI © {year}</span>
        <span className="badge-powered">Final-year project · React practice build</span>
      </div>
    </footer>
  );
}
