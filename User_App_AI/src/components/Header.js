import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';


function Header ()  {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [currentAiResponse, setCurrentAiResponse] = useState(null);
  const [appName, setAppName] = useState('Web App Generator');
  const [appEmoji, setAppEmoji] = useState('🌐');
  const root = document.documentElement;
  // Listen for custom header reload event
  useEffect(() => {
    const handleHeaderReload = (event) => {
      const { aiResponse } = event.detail;
      setCurrentAiResponse(aiResponse);
      console.log('Header received new AI response:', aiResponse);
    };

    window.addEventListener('headerReload', handleHeaderReload);
    
    return () => {
      window.removeEventListener('headerReload', handleHeaderReload);
    };
  }, []);

// Roles and Features

const ROLE_FEATURES = [];
const [groupedRoles, setGroupedRoles] = useState([]); // State to hold grouped roles and features
useEffect(() => {
  if (currentAiResponse) {
    // Process the currentAiResponse data here
    console.log('Processing AI Response:', currentAiResponse);
    
    try {
      // Parse currentAiResponse if it's a string, or use directly if it's an object
      const responseData = typeof currentAiResponse === 'string' ? JSON.parse(currentAiResponse) : currentAiResponse;
      
      // Clear previous data
      ROLE_FEATURES.length = 0;
      if(responseData && responseData.emoji) {
        setAppEmoji(responseData.emoji);
      }
      if(responseData && responseData.appName){
        setAppName(responseData.appName);
      }
      if(responseData && responseData['--header-bg']){
        root.style.setProperty('--header-bg', responseData['--header-bg']);
      }
      if(responseData && responseData['--main-bg']){
        root.style.setProperty('--main-bg', responseData['--main-bg']);
      }
      if (responseData && responseData.roles) {
        responseData.roles.forEach(roleObj => {
          const roleName = roleObj.role;
          const introductionRole = roleObj.introductionRole;
          const features = [];
          if (roleObj.features) {
            roleObj.features.forEach(featureObj => {
              const featureData = {
                feature: featureObj.feature,
                entities: []
              };
              
              // Check if featureObj has entities array (from AI response)
              if(featureObj.entities && Array.isArray(featureObj.entities)){
                featureData.entities = [...featureObj.entities]; // Copy the entities directly
              }
              
              features.push(featureData);
            });
          }
          ROLE_FEATURES.push({role: roleName, introductionRole: introductionRole, features: features});
        });
  
        setGroupedRoles(ROLE_FEATURES);
      }
      
    } catch (error) {
      console.error('Error processing AI response:', error);
      setError('Failed to process AI response data.');
    }
  }
}, [currentAiResponse]); // Depend on currentAiResponse instead of aiResponse

const handleLoginClick = () => {
  navigate('/login');
};

const handleRoleClick = (features, introductionRole, role) => {
  navigate(`/feature`, {state: {"features": features, "introductionRole": introductionRole, "role": role}});
};

  return (
    <header className="lemon-header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')}>
          <span className="logo-icon">{appEmoji}</span>
          <span className="logo-text" >{appName}</span>
        </div>
        <nav className="nav-menu">
          {groupedRoles.map((roleGroup) => (
            <button key={roleGroup.role} className="nav-btn" onClick={() => handleRoleClick(roleGroup.features, roleGroup.introductionRole, roleGroup.role)}>
              {roleGroup.role} 
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          <button className="profile-btn" onClick={handleLoginClick}>
            <div className="avatar">👤</div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
