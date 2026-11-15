import { useState } from 'react';
import './styles.css';

import { site } from './data/site.js';
import { categories } from './data/categories.js';
import { mockIncident } from './data/mockIncident.js';

import TopBar from './components/layout/TopBar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/home/Hero.jsx';
import ServiceCards from './components/home/ServiceCards.jsx';
import CategoryList from './components/home/CategoryList.jsx';
import IncidentPreview from './components/incident/IncidentPreview.jsx';

// Row 1 · Creating and nesting components — App only composes; children render the UI.
// State lives here only for login (moves to AuthContext on Sat 14).
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState({ name: 'Aakash', role: 'citizen' });

  function handleReport() {
    alert('Report form opens on Sat 14');
  }

  return (
    <>
      <TopBar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
      <main>
        <Hero title={site.title} tagline={site.tagline} onReport={handleReport} />
        <ServiceCards services={site.services} />
        <CategoryList categories={categories} />
        <IncidentPreview incident={mockIncident} />
      </main>
      <Footer year={site.year} />
    </>
  );
}
