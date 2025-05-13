import React from "react";

function PetCard({ pet, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 260,
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        background: "#fff",
        cursor: "pointer",
        overflow: "hidden",
        margin: "16px",
        transition: "transform 0.15s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      tabIndex={0}
      aria-label={`View details for ${pet.name}`}
      onKeyPress={e => { if (e.key === "Enter") onClick(); }}
    >
      <img
        src={pet.photo}
        alt={pet.name}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />
      <div style={{ padding: "16px", width: "100%", textAlign: "center" }}>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "1.3rem" }}>{pet.name}</h2>
        {pet.breed && (
          <div style={{ color: "#888", fontSize: "1rem", marginBottom: 4 }}>
            {pet.breed}
          </div>
        )}
        {pet.bio && (
          <div style={{ color: "#555", fontSize: "0.95rem", marginBottom: 4 }}>
            {pet.bio.length > 60 ? pet.bio.slice(0, 60) + "..." : pet.bio}
          </div>
        )}
      </div>
    </div>
  );
}

export default PetCard;