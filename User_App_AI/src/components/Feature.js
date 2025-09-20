import { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feature.css';
import { useLocation } from 'react-router-dom';


const Feature = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFeatures = location.state?.features || [];
  console.log('Selected features from location state:', selectedFeatures);
  const [events, setEvents] = useState([]);
  const BUTTON_ITEMS = ["Add Course", "View Courses"];

 const handleBackClick = () => {
    // Navigate back to event details

    navigate('/');
  };

  return (
    <div className="feature-grid-container">
        <div className="feature-header">
        <button className="back-btn" onClick={handleBackClick}>
          ← Back to AI Features
        </button>
      </div>
      <div className="hero-section">
        <h1>Discover Amazing Features</h1>
        <p>Find a feature for your purpose</p>
      </div>
      <div className="filter-pills">
        {selectedFeatures.length > 0 ? (
          selectedFeatures.map((item) => (
            <button key={item.feature} className="filter-pill" onClick={() => navigate('/form', { state: { "entities": [item.entities], features: selectedFeatures } })}>
              {item.feature}
            </button>
          ))
        ) : (
          <p>No filters available</p>
        )}
      </div>
  
    </div>
  );
}

export default Feature;
