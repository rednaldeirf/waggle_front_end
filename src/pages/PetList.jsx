import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PetCard from "../components/PetCard";
import PetFilter from "../components/PetFilter";
import { fetchPets, fetchBreeds, fetchShelters } from "../services/pets";
import "./PetList.css";


function PetList() {
  const { type } = useParams(); // 'dog' or 'cat'
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedShelter, setSelectedShelter] = useState("");

  useEffect(() => {
    async function loadData() {
      const allPets = await fetchPets(type);
      setPets(allPets);
      setFilteredPets(allPets);
      setBreeds(await fetchBreeds(type));
      setShelters(await fetchShelters());
    }
    loadData();
  }, [type]);

  useEffect(() => {
    let results = pets;
    if (selectedBreed) results = results.filter(pet => pet.breed === selectedBreed);
    if (selectedShelter) results = results.filter(pet => pet.shelter_id === selectedShelter);
    setFilteredPets(results);
  }, [selectedBreed, selectedShelter, pets]);

  return (
    
        <div className="pet-list-container">
          <h1 className="pet-list-title">
            Available {type === "dog" ? "Dogs" : "Cats"}
          </h1>
      
          <PetFilter
            breeds={breeds}
            shelters={shelters}
            selectedBreed={selectedBreed}
            selectedShelter={selectedShelter}
            onBreedChange={setSelectedBreed}
            onShelterChange={setSelectedShelter}
          />
      
          <div className="pet-grid">
            {filteredPets.map((pet) => (
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