import { useState } from 'react';
import './HomePage.css';


const HomePage = () => {
  const [error, setError] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(true);
    try {
      const AIresponse = await fetch('http://localhost:5000/query-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "prompt": document.getElementById('user-prompt').value
        })
      });

      const AIdata = await AIresponse.json();
      console.log('AI Response:', AIdata.response);

      // When we receive AI response, update state
      if (AIdata.response) {
        setAiResponse(AIdata.response);
      } else {
        setError('No response from AI service. Please try again.');
      }

    } catch (err) {
      console.error('Error fetching AI response:', err);
      setError('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    document.getElementById('user-prompt').value = '';
    setAiResponse(null);
    setError(null);
  };

  return (
    <div className="event-grid-container">
      <div className="hero-section">
        <h1>Discover Amazing AI-Generated Websites</h1>
        <p>Explore creative project ideas and generate your own unique website</p>
      </div>
      {loading && <div className="loading-message">Generating your website... Please wait.</div>}
      {error && <div className="error-message">{error}</div>}
      {aiResponse && !loading && (
        <div className="ai-response">
          <h2>Your website is successfully generated!</h2>
        </div>
      )}
      <div className="filter-pills">
        <div className="prompt-section">
          <label htmlFor="user-prompt">Input a topic/ description of the project you would like to propose</label>
          <textarea id="user-prompt" name="user-prompt" rows="4"
            placeholder="Input the project title/idea you have in mind here ..."></textarea>
          <div className="button-container">
            <button type="button" onClick={handleClear} className="clear-btn">Clear</button>
            <button type="button" onClick={handleGenerate} className="submit-btn">Generate</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
