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

export async function createPet(petData) {
  const resp = await api.post("/pets/", petData)
  return resp.data
}  

// Adoption Inquiry
export async function createInquiry(petId, inquiryData) {
  const resp = await api.post(`/pets/${petId}/inquiries/`, inquiryData)
  return resp.data
}

export async function deletePet(petId) {
  const resp = await api.delete(`/pets/${petId}/`);
  return resp.data;
}