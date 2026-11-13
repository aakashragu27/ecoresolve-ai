// Row 6 · Rendering lists — the 7 AI categories with map() and key={c.id}.
export default function CategoryList({ categories }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <h2 className="section-title">What the AI can recognise</h2>
        <ul className="chip-list">
          {categories.map((c) => (
            <li key={c.id} className="chip">
              <span aria-hidden="true">{c.icon}</span> {c.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
