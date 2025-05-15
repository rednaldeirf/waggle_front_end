// import React from "react";

// function PetCard({ pet, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         width: 260,
//         borderRadius: 16,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
//         background: "#fff",
//         cursor: "pointer",
//         overflow: "hidden",
//         margin: "16px",
//         transition: "transform 0.15s",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//       tabIndex={0}
//       aria-label={`View details for ${pet.name}`}
//       onKeyPress={e => { if (e.key === "Enter") onClick(); }}
//     >
//       <img
//         src={pet.image_url}
//         alt={pet.name}
//         style={{
//           width: "100%",
//           height: 180,
//           objectFit: "cover",
//           borderTopLeftRadius: 16,
//           borderTopRightRadius: 16,
//         }}
//       />
//       <div style={{ padding: "16px", width: "100%", textAlign: "center" }}>
//         <h2 style={{ margin: "0 0 8px 0", fontSize: "1.3rem" }}>{pet.name}</h2>
//         {pet.breed && (
//           <div style={{ color: "#888", fontSize: "1rem", marginBottom: 4 }}>
//             {pet.breed}
//           </div>
//         )}
//         {pet.bio && (
//           <div style={{ color: "#555", fontSize: "0.95rem", marginBottom: 4 }}>
//             {pet.bio.length > 60 ? pet.bio.slice(0, 60) + "..." : pet.bio}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PetCard;



// src/components/PetCard.jsx
import React from 'react'

export default function PetCard({ pet, onClick }) {
  const { name, description, age, species, image_url } = pet

  // Optional: truncate description
  const shortDesc =
    description?.length > 100
      ? description.slice(0, 100) + '…'
      : description

  return (
    <div
      onClick={onClick}
      className="
        max-w-sm bg-white border border-gray-200 rounded-lg 
        shadow-md overflow-hidden cursor-pointer 
        hover:shadow-lg transition-shadow duration-200
      "
    >
      {image_url && (
        <img
          src={image_url}
          alt={name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {species} • {age} {age === 1 ? 'year' : 'years'} old
        </p>
        <p className="text-gray-700 text-base">
          {shortDesc}
        </p>
      </div>
    </div>
  )
}




