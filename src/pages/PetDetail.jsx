import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPet } from '../services/pets';

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
//   const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOnePet = async () => {
        const petData = await fetchPet(id);
        setPet(petData);
    };

    fetchOnePet();
  }, [id]);

//   const handleAdopt = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/adoption-inquiry`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Token ${token}`,
//         },
//         body: JSON.stringify({
//           pet: pet.id,
//           message: `Hi! I'm interested in adopting ${pet.name}.`,
//         }),
//       });
//       if (!res.ok) throw new Error('Failed to submit inquiry');
//       alert('Adoption inquiry submitted!');
//       navigate('/inquiries');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

  const handleBack = () => {
    navigate(`/pets/${pet.species}`);
  };

//   const handleImageError = () => {
//     setImageError(true);
//   };

//   if (error) {
//     return (
//       <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
//         <button 
//           onClick={() => navigate('/pets')} 
//           className="mb-4 text-blue-500 hover:underline flex items-center"
//         >
//           ← Back to Pets
//         </button>
//         <div className="text-red-500">
//           <h2 className="text-xl font-bold mb-2">Error Loading Pet Details</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!pet) {
//     return (
//       <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
//         <button 
//           onClick={() => navigate('/pets')} 
//           className="mb-4 text-blue-500 hover:underline flex items-center"
//         >
//           ← Back to Pets
//         </button>
//         <p>Loading pet details...</p>
//       </div>
//     );
//   }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <button 
        onClick={handleBack} 
        className="mb-4 text-blue-500 hover:underline flex items-center"
      >
        ← Back to Pets
      </button>
      
      <div className="space-y-4">
        {imageError ? (
          <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
            <p className="text-gray-500">Image not available</p>
          </div>
        ) : (
          <img 
            src={pet?.image_url} 
            alt={pet?.name} 
            className="w-full h-64 object-cover rounded mb-4" 
            // onError={handleImageError}
          />
        )}
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{pet?.name}</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><strong>Breed:</strong> {pet?.breed}</p>
              <p className="text-gray-600"><strong>Age:</strong> {pet?.age}</p>
              <p className="text-gray-600"><strong>Gender:</strong> {pet?.gender}</p>
            </div>
            
            <div>
              <p className="text-gray-600"><strong>Shelter:</strong> {pet?.shelter?.name}</p>
              <p className="text-gray-600"><strong>Location:</strong> {pet?.shelter?.location}</p>
              <p className="text-gray-600"><strong>Contact:</strong> {pet?.shelter?.contact}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">About {pet?.name}</h2>
            <p className="text-gray-700">{pet?.description}</p>
          </div>
          
          <div className="mt-6">
            <button
            //   onClick={handleAdopt}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Adopt {pet?.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;