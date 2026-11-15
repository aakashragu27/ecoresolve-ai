import ServiceCard from './ServiceCard.jsx';

// Row 6 · Rendering lists — map() over services, stable key from the data id.
export default function ServiceCards({ services }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">What you can do here</h2>
        <div className="card-grid">
          {services.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
