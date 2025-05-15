import api from "./apiConfig";

// Fetch all pets of a given type (dog/cat)
export async function fetchPets(type) {
  const resp = await api.get(`/pets/?species=${type}`);
  return resp.data;
}

export async function fetchPet(id) {
  const resp = await api.get(`/pets/${id}/`);
  return resp.data;
}

// Fetch all breeds for a type
// export async function fetchBreeds(type) {
//   const resp = await api.get(`/pets/breeds/?species=${type}`);
//   return resp.data;
// }

// Fetch all shelters
// export async function fetchShelters() {
//   const resp = await api.get("/shelters/");
//   return resp.data;
// } 