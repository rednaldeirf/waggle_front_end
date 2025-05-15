import api from "./apiConfig";

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/shelters/login/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  } catch (error) {
    console.error("Shelter sign in error:", error.response?.data || error.message);
    throw error;
  }
};

// Get all inquiries for a shelter
export const getShelterInquiries = async (shelterId) => {
  try {
    console.log('Starting getShelterInquiries with shelter ID:', shelterId);
    
    if (!shelterId) {
      console.error('No shelter ID provided');
      throw new Error('No shelter ID provided');
    }

    // Get all pets
    console.log('Fetching all pets from API...');
    const petsResponse = await api.get('/pets/');
    const allPets = petsResponse.data;
    console.log("Total pets fetched:", allPets.length);
    
    // Filter pets that belong to the current shelter
    const shelterPets = allPets.filter(pet => {
      // Handle both nested and flat shelter data structures
      const petShelterId = typeof pet.shelter === 'object' ? pet.shelter.id : pet.shelter;
      const matches = petShelterId === shelterId;
      console.log(`Pet ${pet.id} (${pet.name}):`, {
        petShelterId,
        currentShelterId: shelterId,
        matches,
        petData: pet
      });
      return matches;
    });
    
    console.log("Pets belonging to shelter:", {
      count: shelterPets.length,
      petIds: shelterPets.map(p => p.id),
      petNames: shelterPets.map(p => p.name)
    });
    
    if (shelterPets.length === 0) {
      console.log("No pets found for this shelter");
      return [];
    }
    
    // Then get inquiries for each pet
    const allInquiries = [];
    for (const pet of shelterPets) {
      try {
        console.log(`Fetching inquiries for pet ${pet.id} (${pet.name})...`);
        const inquiryResponse = await api.get(`/pets/${pet.id}/inquiries/`);
        const inquiries = inquiryResponse.data;
        console.log(`Found ${inquiries.length} inquiries for pet ${pet.id}:`, {
          petId: pet.id,
          petName: pet.name,
          inquiries: inquiries.map(i => ({
            id: i.id,
            status: i.status,
            created_at: i.created_at,
            message: i.message
          }))
        });
        
        // Add pet information to each inquiry
        const inquiriesWithPet = inquiries.map(inquiry => ({
          ...inquiry,
          pet: {
            ...pet,
            shelter: typeof pet.shelter === 'object' ? pet.shelter : { id: pet.shelter }
          }
        }));
        allInquiries.push(...inquiriesWithPet);
      } catch (error) {
        console.error(`Error fetching inquiries for pet ${pet.id}:`, {
          error: error.message,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.config?.headers
        });
        // Continue with other pets even if one fails
        continue;
      }
    }
    
    console.log("Final inquiries summary:", {
      totalInquiries: allInquiries.length,
      inquiriesByPet: shelterPets.map(pet => ({
        petId: pet.id,
        petName: pet.name,
        inquiryCount: allInquiries.filter(i => i.pet.id === pet.id).length
      }))
    });
    
    return allInquiries;
  } catch (error) {
    console.error("Error in getShelterInquiries:", {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers
    });
    throw error;
  }
};

// Update inquiry status
export const updateInquiryStatus = async (petId, inquiryId, newStatus) => {
  try {
    console.log(`Updating inquiry ${inquiryId} for pet ${petId} to ${newStatus}`);
    const response = await api.patch(`/pets/${petId}/inquiries/${inquiryId}/`, { status: newStatus });
    console.log("Update inquiry response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating inquiry status:", error.response?.data || error.message);
    throw error;
  }
};

// Edit inquiry
export const editInquiry = async (petId, inquiryId, inquiryData) => {
  try {
    console.log(`Editing inquiry ${inquiryId} for pet ${petId}:`, inquiryData);
    const response = await api.put(`/pets/${petId}/inquiries/${inquiryId}/`, inquiryData);
    console.log("Edit inquiry response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error editing inquiry:", error.response?.data || error.message);
    throw error;
  }
};

// Delete an inquiry
export const deleteInquiry = async (petId, inquiryId) => {
  try {
    console.log(`Deleting inquiry ${inquiryId} for pet ${petId}`);
    const response = await api.delete(`/pets/${petId}/inquiries/${inquiryId}/`);
    console.log("Delete inquiry response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting inquiry:", error.response?.data || error.message);
    throw error;
  }
};

// Get shelter profile
export const getShelterProfile = async () => {
  try {
    console.log("Fetching shelter profile...");
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData.shelter || !userData.shelter.id) {
      throw new Error('No shelter data found. Please log in again.');
    }
    
    const response = await api.get(`/shelters/${userData.shelter.id}/`);
    console.log("Shelter profile response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching shelter profile:", error.response?.data || error.message);
    throw error;
  }
};

// Update shelter profile
export const updateShelterProfile = async (profileData) => {
  try {
    console.log("Updating shelter profile...");
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData.shelter || !userData.shelter.id) {
      throw new Error('No shelter data found. Please log in again.');
    }
    
    const response = await api.patch(`/shelters/${userData.shelter.id}/`, profileData);
    console.log("Update shelter profile response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating shelter profile:", error.response?.data || error.message);
    throw error;
  }
};

// Approve inquiry and update pet status
export const approveInquiry = async (petId, inquiryId) => {
  try {
    // First, update the inquiry status to Approved
    const inquiryResponse = await api.patch(`/pets/${petId}/inquiries/${inquiryId}/`, {
      status: "Approved"
    });
    console.log("Inquiry approval response:", inquiryResponse.data);

    // Then, update the pet status to adopted
    const petResponse = await api.patch(`/pets/${petId}/`, {
      status: "adopted"
    });
    console.log("Pet status update response:", petResponse.data);

    // Create an adoption record
    const adoptionResponse = await api.post(`/pets/adopted/`, {
      pet: petId,
      inquiry: inquiryId,
      user: inquiryResponse.data.user,
      status: "completed"
    });
    console.log("Adoption record creation response:", adoptionResponse.data);

    return {
      inquiry: inquiryResponse.data,
      pet: petResponse.data,
      adoption: adoptionResponse.data
    };
  } catch (error) {
    console.error("Error in approveInquiry:", error);
    throw error;
  }
}; 