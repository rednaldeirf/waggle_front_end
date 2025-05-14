import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdoptionForm = () => {
  const { petId } = useParams();

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    prior_experience: "",
    currently_own_pet: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        prior_experience: formData.prior_experience === "yes",
        currently_own_pet: formData.currently_own_pet === "yes",
      };
      await axios.post(`/api/pets/${petId}/inquiries/`, payload);
      alert("Inquiry submitted!");
      setFormData({
        full_name: "",
        phone_number: "",
        address: "",
        prior_experience: "",
        currently_own_pet: "",
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">
          Adoption Inquiry
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full bg-gray-700 text-gray-200 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            required
          />

          <input
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full bg-gray-700 text-gray-200 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            required
          />

          <input
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full bg-gray-700 text-gray-200 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            required
          />

          <div className="text-gray-200">
            <p className="mb-1">Prior experience raising a pet?</p>
            {["yes", "no"].map((opt) => (
              <label key={opt} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="prior_experience"
                  value={opt}
                  checked={formData.prior_experience === opt}
                  onChange={handleChange}
                  className="form-radio text-blue-500"
                  required
                />
                <span className="ml-2">
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </span>
              </label>
            ))}
          </div>

          <div className="text-gray-200">
            <p className="mb-1">Do you currently own a pet?</p>
            {["yes", "no"].map((opt) => (
              <label key={opt} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="currently_own_pet"
                  value={opt}
                  checked={formData.currently_own_pet === opt}
                  onChange={handleChange}
                  className="form-radio text-blue-500"
                  required
                />
                <span className="ml-2">
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 rounded-md hover:from-indigo-600 hover:to-blue-600 transition"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
