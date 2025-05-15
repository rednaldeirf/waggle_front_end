import React, { useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";

function PreferenceButtons({ onSelect }) {
  const [hovered, setHovered] = useState(null); // "dog" or "cat" or null

  return (
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "64px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => onSelect("dog")}
          onMouseEnter={() => setHovered("dog")}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            transition: "background 0.2s",
          }}
          aria-label="Dog"
        >
          <PetsIcon style={{ fontSize: 60 }} />
        </button>
        <div style={{ height: "32px", marginTop: "8px" }}>
          {hovered === "dog" && (
            <span style={{ fontSize: "1.2rem", color: "#4CAF50", fontWeight: "bold" }}>
              Dog
            </span>
          )}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => onSelect("cat")}
          onMouseEnter={() => setHovered("cat")}
          onMouseLeave={() => setHovered(null)}
          style={{
             background: "#FF9800",
             color: "white",
             border: "none",
             borderRadius: "50%",
             width: "100px",
             height: "100px",
             cursor: "pointer",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             fontSize: "2.5rem",
             boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
             transition: "background 0.2s",
          
          }}
          aria-label="Cat"
        >
          <PetsIcon style={{ fontSize: 60 }} />
        </button>
        <div style={{ height: "32px", marginTop: "8px" }}>
          {hovered === "cat" && (
            <span style={{ fontSize: "1.2rem", color: "#FF9800", fontWeight: "bold" }}>
              Cat
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreferenceButtons; 