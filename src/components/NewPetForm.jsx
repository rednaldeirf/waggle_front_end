// src/components/NewPetForm.jsx
import React, { useState, useContext } from 'react'
import { createPet } from '../services/pets'
import { UserContext } from '../contexts/UserContext'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
  Grid,
  Typography,
  CircularProgress
} from '@mui/material'

export default function NewPetForm({ onPetAdded }) {
  const { shelter } = useContext(UserContext);
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [breed, setBreed] = useState('')
  const [description, setDescription] = useState('')
  const [age, setAge] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!shelter || !shelter.id) {
      setError('No shelter information available. Please try logging in again.');
      setLoading(false);
      return;
    }

    try {
      const petData = {
        name,
        species,
        breed,
        description,
        age: parseInt(age),
        image_url: imageUrl || 'https://placehold.co/400x300?text=Pet+Image',
        shelter: shelter.id
      }
      
      console.log('Submitting pet data:', petData)
      const newPet = await createPet(petData);
      console.log('Pet created successfully:', newPet)

      // Clear form
      setName('')
      setSpecies('')
      setBreed('')
      setDescription('')
      setAge('')
      setImageUrl('')

      // Let parent know if they passed a callback
      onPetAdded()
    } catch (err) {
      console.error('Error creating pet:', err.response?.data || err.message)
      setError(err.response?.data?.message || "Oops! Couldn't add your pet. Try again?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Pet Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required variant="outlined">
            <InputLabel>Species</InputLabel>
            <Select
              value={species}
              onChange={e => setSpecies(e.target.value)}
              label="Species"
            >
              <MenuItem value="dog">Dog</MenuItem>
              <MenuItem value="cat">Cat</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Breed"
            value={breed}
            onChange={e => setBreed(e.target.value)}
            required
            placeholder="e.g., Labrador Retriever, Siamese"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Age (years)"
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
            inputProps={{ min: 0, max: 30 }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://example.com/pet-image.jpg"
            variant="outlined"
            helperText="Leave empty to use a default image"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
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
                <span style={{ visibility: 'hidden' }}>Add Pet</span>
              </>
            ) : (
              'Add Pet'
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
