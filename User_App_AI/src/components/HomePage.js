import { useState, useEffect } from 'react';
import './HomePage.css';


const HomePage = () => {
  const [error, setError] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);

  // Custom event to trigger header reload
  const triggerHeaderReload = (responseData) => {
    const event = new CustomEvent('headerReload', { 
      detail: { aiResponse: responseData } 
    });
    window.dispatchEvent(event);
  };
useEffect(() => {
  const fetchData = async () => {
    try {
      const AIresponse = await fetch('http://localhost:5000/saved-prompts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const AIdata = await AIresponse.json();
      console.log('AI Response:', AIdata.data);

      if (AIdata.data) {
        setAiResponse(AIdata.data);
        triggerHeaderReload(AIdata.data);
      } else {
        setError('No response from AI service. Please try again.');
      }
    } catch (error) {
      setError('Failed to fetch saved prompts. Please try again.');
    }
  };

  fetchData();
}, []);

  return (
    <div className="event-grid-container">
      <div className="hero-section">
        <h1>Wellcome to Our Website</h1>
        <p>Explore creative project ideas and generate your own unique website</p>
      </div>
    </div>
  );
}

export default HomePage;
