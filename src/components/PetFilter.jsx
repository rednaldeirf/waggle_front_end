import React from "react";

function PetFilter({ breeds, shelters, selectedBreed, selectedShelter, onBreedChange, onShelterChange }) {
  return (
    <div style={{ margin: "24px 0", display: "flex", gap: "24px", alignItems: "center" }}>
      <label>
        Breed:
        <select value={selectedBreed} onChange={e => onBreedChange(e.target.value)}>
          <option value="">All</option>
          {breeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
      </label>
      <label>
        Shelter:
        <select value={selectedShelter} onChange={e => onShelterChange(e.target.value)}>
          <option value="">All</option>
          {shelters.map(shelter => (
            <option key={shelter.id} value={shelter.id}>{shelter.name}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default PetFilter;