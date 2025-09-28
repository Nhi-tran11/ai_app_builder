import {  use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const selectedEntities = location.state?.entities || [];
  console.log('Selected entities from location state:', selectedEntities);
  const features = location.state?.features || [];
  const role = location.state?.role || '';
  const introductionRole = location.state?.introductionRole || '';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleBackClick = () => {
    // Navigate back to event details
    navigate('/feature', {
      state: {
        entities: selectedEntities,  // Pass back the current entities
        features: features,
        role: role, // Pass back the current role
        introductionRole: introductionRole // Pass back the current introductionRole
      }
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
   

    setIsSubmitting(true);

    }

  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-btn" onClick={handleBackClick}>
          ← Back to Features
        </button>
      </div>

      <div className="form-content">
        <div className="form-main">
          {selectedEntities.length > 0 && selectedEntities.map((entities, entityIndex) => entities.map((entity, innerIndex) => (
      <form key={`${entityIndex}-${innerIndex}`} className="booking-form" onSubmit={handleFormSubmit}>
        <div className="form-section">
          <h1> {entity.entity || `Entity ${entityIndex + 1}`}</h1>
          {entity.attributes &&
            entity.attributes.map((attribute, attrIndex) => (
              <div className="form-group" key={`${entityIndex}-${innerIndex}-${attrIndex}`}>
                <label htmlFor={`${entityIndex}-${attribute}`}>{attribute} *</label>
                <input
                  type="text"
                  id={`${entityIndex}-${attribute}`}
                  name={`${entityIndex}-${attribute}`}
                  onChange={handleInputChange}
                  required
                  placeholder={`Enter ${typeof attribute === "string" ? attribute.toLowerCase() : attribute}`}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className={`confirm-form-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>🔄 Processing...</span>
                ) : (
                  <span>🎉 Submit {entity.entity || 'Form'}</span>
                )}
              </button>
            </form>
          )))}
        </div>
      
      </div>
    </div>
  );
};

export default Form;
