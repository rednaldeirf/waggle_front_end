import React from "react";

function PreferenceButtons({ onSelect }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <button
        onClick={() => onSelect("dog")}
        style={{
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "18px 40px",
          fontSize: "1.3rem",
          margin: "0 16px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.2s",
        }}
      >
        Dog
      </button>
      <button
        onClick={() => onSelect("cat")}
        style={{
          background: "#FF9800",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "18px 40px",
          fontSize: "1.3rem",
          margin: "0 16px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.2s",
        }}
      >
        Cat
      </button>
    </div>
  );
}

export default PreferenceButtons;