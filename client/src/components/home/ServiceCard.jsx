// A pure component: everything it shows arrives as props (portable to client/ on Sat 14).
export default function ServiceCard({ icon, title, points, linkText }) {
  return (
    <article className="card">
      <div className="card-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <a className="card-link" href="#">{linkText} →</a>
    </article>
  );
}
