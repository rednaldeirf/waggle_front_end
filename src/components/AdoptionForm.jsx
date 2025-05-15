import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createInquiry } from "../services/pets";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';

const AdoptionForm = ({ setShowModal }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    prior_experience: "",
    currently_own_pet: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const payload = {
        ...formData,
        prior_experience: formData.prior_experience === "yes",
        currently_own_pet: formData.currently_own_pet === "yes",
        message: formData.message || `Hi! I'm interested in adopting this pet.`
      };
      await createInquiry(id, payload);

      setFormData({
        full_name: "",
        phone_number: "",
        address: "",
        prior_experience: "",
        currently_own_pet: "",
        message: ""
      });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="full_name"
          label="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />

        <TextField
          name="phone_number"
          label="Phone Number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />

        <TextField
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            startAdornment: <HomeIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />

        <FormControl component="fieldset" required>
          <FormLabel component="legend">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsIcon color="primary" />
              <Typography>Prior experience raising a pet?</Typography>
            </Box>
          </FormLabel>
          <RadioGroup
            name="prior_experience"
            value={formData.prior_experience}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" required>
          <FormLabel component="legend">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PetsIcon color="primary" />
              <Typography>Do you currently own a pet?</Typography>
            </Box>
          </FormLabel>
          <RadioGroup
            name="currently_own_pet"
            value={formData.currently_own_pet}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <TextField
          name="message"
          label="Message to Shelter"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          placeholder="Tell the shelter why you're interested in adopting this pet..."
          fullWidth
          InputProps={{
            startAdornment: <MessageIcon sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.5,
            position: 'relative'
          }}
        >
          {loading ? (
            <>
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
              <span style={{ visibility: 'hidden' }}>Submit Inquiry</span>
            </>
          ) : (
            'Submit Inquiry'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default AdoptionForm;