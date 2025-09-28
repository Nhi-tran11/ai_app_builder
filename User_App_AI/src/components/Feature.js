
import { useNavigate } from 'react-router-dom';
import './Feature.css';
import { useLocation } from 'react-router-dom';


const Feature = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFeatures = location.state?.features || [];
  const introductionRole = location.state?.introductionRole || '';
  const role = location.state?.role || '';

 const handleBackClick = () => {
    // Navigate back to event details

    navigate('/');
  };

  return (
    <div className="feature-grid-container">
        <div className="feature-header">
        <button className="back-btn" onClick={handleBackClick}>
          ← Back to Main Page
        </button>
      </div>
      <div className="hero-section">
        <h1>{role} Management</h1>
        <p>{introductionRole}</p>
      </div>
      <div className="filter-pills">
        {selectedFeatures.length > 0 ? (
          selectedFeatures.map((item) => (
            <button key={item.feature} className="filter-pill" onClick={() => navigate('/form', { state: { "entities": [item.entities], features: selectedFeatures, "role": role, "introductionRole": introductionRole } })}>
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
