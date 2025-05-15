import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PetCard from "../components/PetCard";
import PetFilter from "../components/PetFilter";
import { fetchPets } from "../services/pets";

function PetList() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
//   const [selectedBreed, setSelectedBreed] = useState("");
//   const [selectedShelter, setSelectedShelter] = useState("");

  const { type } = useParams(); // 'dog' or 'cat'
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const allPets = await fetchPets(type);
      setPets(allPets);
      setFilteredPets(allPets);
    }
    loadData();
  }, [type]);

//   useEffect(() => {
//     let results = pets;
//     if (selectedBreed) results = results.filter(pet => pet.breed === selectedBreed);
//     if (selectedShelter) results = results.filter(pet => pet.shelter_id === selectedShelter);
//     setFilteredPets(results);
//   }, [selectedBreed, selectedShelter, pets]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h1>Available {type === "dog" ? "Dogs" : "Cats"}</h1>
      {/* <PetFilter
        selectedBreed={selectedBreed}
        selectedShelter={selectedShelter}
        onBreedChange={setSelectedBreed}
        onShelterChange={setSelectedShelter}
      /> */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        justifyContent: "center",
        overflowY: "auto",
        maxHeight: "70vh"
      }}>
        {filteredPets.map(pet => (
          <PetCard
            key={pet.id}
            pet={pet}
            onClick={() => navigate(`/pet/${pet.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default PetList;