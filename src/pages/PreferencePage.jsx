import React from 'react';
import { useNavigate } from 'react-router-dom';
import PreferenceButtons from "../components/PreferenceButtons";

// function PreferencePage() {
//   const navigate = useNavigate(); // Hook to help us go to a different page

//   // This function handles what happens when a user clicks Dog or Cat
//   function handleChoice(type) {
//     // It sends the user to "/pets/dog" or "/pets/cat"
//     navigate(`/pets/${type}`);
//   }

//   return (
//     <div style={{ textAlign: 'center', marginTop: '100px' }}>
//       <h1>Are you looking for a dog or a cat?</h1>

//       <div style={{ marginTop: '40px' }}>
//         <button onClick={() => handleChoice('dog')} style={{ marginRight: '20px' }}>
//           Dog
//         </button>

//         <button onClick={() => handleChoice('cat')}>
//           Cat
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PreferencePage;

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