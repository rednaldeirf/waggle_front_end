import React from 'react';
import { useNavigate } from 'react-router-dom';
import PreferenceButtons from "../components/PreferenceButtons";


function PreferencePage() {
    const navigate = useNavigate();
  
    function handleChoice(type) {
      navigate(`/pets/${type}`);
    }
  
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Are you looking for a dog or a cat?</h1>
        <PreferenceButtons onSelect={handleChoice} />
      </div>
    );
  }
  
  export default PreferencePage;