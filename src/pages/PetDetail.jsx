import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPet, createInquiry } from '../services/pets';
import { UserContext } from '../contexts/UserContext';
import AdoptionForm from '../components/AdoptionForm';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  Dialog,
  IconButton,
  Divider,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, shelter } = useContext(UserContext);
  const [pet, setPet] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const petData = await fetchPet(id);
        setPet(petData);
        setError(null);
      } catch (err) {
        setError('Failed to load pet details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [id]);

  const handleBack = () => {
    if (shelter) {
      navigate('/shelter-dashboard');
    } else {
      navigate(`/pets/${pet.species}`);
    }
  };

  const handleAdopt = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!pet) return <div>Pet not found</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {imageError ? (
                <Box
                  sx={{
                    height: 400,
                    bgcolor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography color="text.secondary">
                    Image not available
                  </Typography>
                </Box>
              ) : (
                <CardMedia
                  component="img"
                  height={400}
                  image={pet.image_url}
                  alt={pet.name}
                  sx={{ objectFit: 'cover' }}
                />
              )}
            </Card>
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {pet.name}
                </Typography>
                <Chip
                  label={pet.is_adopted ? "Adopted" : "Available for Adoption"}
                  color={pet.is_adopted ? "success" : "primary"}
                  sx={{ mb: 2 }}
                />
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Breed
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {pet.breed}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Age
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {pet.age} {pet.age === 1 ? 'year' : 'years'} old
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Species
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {pet.species}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {pet.gender}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Shelter Information */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BusinessIcon color="primary" />
                  Shelter Information
                </Typography>
                <Box sx={{ pl: 4 }}>
                  <Typography variant="body1" gutterBottom>
                    {pet.shelter?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                  >
                    <LocationOnIcon fontSize="small" />
                    {pet.shelter?.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <PhoneIcon fontSize="small" />
                    {pet.shelter?.contact}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Description */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  About {pet.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {pet.description}
                </Typography>
              </Box>

              {/* Adoption Button */}
              <Box sx={{ mt: 'auto', pt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleAdopt}
                  disabled={pet.is_adopted}
                  sx={{ py: 1.5 }}
                >
                  {pet.is_adopted ? 'Already Adopted' : `Adopt ${pet.name}`}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Adoption Form Modal */}
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h6">
            Adoption Application
          </Typography>
          <IconButton
            onClick={handleCloseModal}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 3 }}>
          <AdoptionForm setShowModal={setShowModal} />
        </Box>
      </Dialog>
    </Container>
  );
};

export default PetDetail;