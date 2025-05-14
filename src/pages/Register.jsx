import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/users";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

function Register() {
  const navigate = useNavigate();
  const { setUser, setShelter } = useContext(UserContext);

  const [registrationType, setRegistrationType] = useState("user");
  const [form, setForm] = useState({
    username: "",
    email: "",      
    password: "",
    isError: false,
    errorMsg: "",
    shelter_name: "",
    shelter_location: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRegistrationTypeChange(event, newType) {
    if (newType) {
      setRegistrationType(newType);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const requestBody = {
        ...form,
        is_shelter_owner: registrationType === "shelter"
      };
      
      const userData = await signUp(requestBody);
      setUser(userData.user);
      setShelter(userData.shelter);
      
      if (registrationType === "user") {
        navigate("/preferences");
      } else {
        navigate("/shelter-dashboard");
      }
      
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        isError: true,
        errorMsg: "Registration failed. Please try again.",
      }));
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <ToggleButtonGroup
          value={registrationType}
          exclusive
          onChange={handleRegistrationTypeChange}
          sx={{ mb: 2, width: "100%" }}
        >
          <ToggleButton value="user" sx={{ flex: 1 }}>
            User
          </ToggleButton>
          <ToggleButton value="shelter" sx={{ flex: 1 }}>
            Shelter
          </ToggleButton>
        </ToggleButtonGroup>

        <input
          type="text"
          name="username"
          value={form.username}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {registrationType === "shelter" && (
          <>
            <input
              type="text"
              name="shelter_name"
              value={form.shelter_name}
              placeholder="Shelter Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="shelter_location"
              value={form.shelter_location}
              placeholder="Shelter Location"
              onChange={handleChange}
              required
            />
          </>
        )}

        {form.isError && <div style={{ color: "red" }}>{form.errorMsg}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;