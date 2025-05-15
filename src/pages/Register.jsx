import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/users";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Link
} from "@mui/material";
import { UserContext } from "../contexts/UserContext";

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
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create an Account
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
          <ToggleButtonGroup
            value={registrationType}
            exclusive
            onChange={handleRegistrationTypeChange}
            sx={{ mb: 3, width: "100%" }}
          >
            <ToggleButton 
              value="user" 
              sx={{ 
                flex: 1,
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }
              }}
            >
              User
            </ToggleButton>
            <ToggleButton 
              value="shelter" 
              sx={{ 
                flex: 1,
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }
              }}
            >
              Shelter
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          {registrationType === "shelter" && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Shelter Name"
                name="shelter_name"
                value={form.shelter_name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Shelter Location"
                name="shelter_location"
                value={form.shelter_location}
                onChange={handleChange}
              />
            </>
          )}

          {form.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {form.errorMsg}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                component="button"
                variant="body2"
                onClick={() => navigate('/')}
                sx={{ cursor: 'pointer' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;