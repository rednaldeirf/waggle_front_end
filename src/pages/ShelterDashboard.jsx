import React, { useState, useEffect, useContext } from 'react'
import NewPetForm from '../components/NewPetForm'
import { fetchPets, deletePet } from '../services/pets'
import { getShelterInquiries } from '../services/shelters'
import { useNavigate } from 'react-router-dom'
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Fab,
  DialogActions,
  DialogContentText
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import PetCard from '../components/PetCard'
import { UserContext } from '../contexts/UserContext'

export default function ShelterDashboard() {
  const [pets, setPets] = useState([])
  const [pendingCount, setPendingCount] = useState(0)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [petToDelete, setPetToDelete] = useState(null)
  const navigate = useNavigate()
  const { shelter } = useContext(UserContext)

  useEffect(() => {
    loadData();
  }, [shelter]);

  const loadData = async () => {
    try {
      const allPets = await fetchPets("");
      const shelterPets = allPets.filter(pet => {
        const petShelterId = pet.shelter?.id || pet.shelter;
        const matches = petShelterId === shelter.id;
        return matches;
      });
      setPets(shelterPets);

      if (shelter) {
        const inquiries = await getShelterInquiries(shelter.id);
        const pendingInquiries = inquiries.filter(inquiry => inquiry.status === 'Pending');
        setPendingCount(pendingInquiries.length);
      }
    } catch (err) {
      console.error("Error loading data:", err)
    }
  };

  const handlePetAdded = async (newPet) => {
    await loadData();
    setFormOpen(false);
  };

  const handleDeleteClick = (petId) => {
    setPetToDelete(petId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePet(petToDelete);
      await loadData();
      setDeleteDialogOpen(false);
      setPetToDelete(null);
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPetToDelete(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative' }}>
      {/* Stats row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Pets
              </Typography>
              <Typography variant="h3" component="div">
                {pets.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card 
            sx={{ 
              height: '100%', 
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => navigate('/shelter/inquiries')}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Pending Applications
              </Typography>
              <Typography variant="h3" component="div">
                {pendingCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Adopted This Month
              </Typography>
              <Typography variant="h3" component="div">
                {pets.filter(pet => pet.is_adopted).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Active Shelters
              </Typography>
              <Typography variant="h3" component="div">
                3
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>

      {/* Main content grid */}
      <Grid container spacing={3}>
        {/* Pets Grid */}
        <Grid item xs={12}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h2">
              Available Pets
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/shelter/inquiries')}
              >
                View All Inquiries
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setFormOpen(true)}
              >
                Add New Pet
              </Button>
            </Box>
          </Box>
          <Paper sx={{ p: 2, mb: 4 }}>
            <Grid container spacing={2}>
              {pets && pets
                .filter(pet => !pet.is_adopted)
                .map(pet => (
                  <Grid item xs={12} sm={6} md={4} key={pet.id}>
                    <PetCard 
                      pet={pet}
                      onClick={() => navigate(`/pet/${pet.id}`)}
                      onDelete={handleDeleteClick}
                      isDashboard={true}
                    />
                  </Grid>
                ))}
            </Grid>
          </Paper>

          {/* Adopted Pets Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h2">
              Adopted Pets
            </Typography>
          </Box>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {pets && pets
                .filter(pet => pet.is_adopted)
                .map(pet => (
                  <Grid item xs={12} sm={6} md={4} key={pet.id}>
                    <PetCard 
                      pet={pet}
                      onClick={() => navigate(`/pet/${pet.id}`)}
                      isDashboard={false}
                    />
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Pet Dialog */}
      <Dialog 
        open={formOpen} 
        onClose={() => setFormOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24
          }
        }}
      >
        <DialogTitle sx={{ 
          m: 0, 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'white'
        }}>
          <Typography variant="h6" component="div">
            Add New Pet
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setFormOpen(false)}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <NewPetForm onPetAdded={handlePetAdded} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 2
          }
        }}
      >
        <DialogTitle>Delete Pet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this pet? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { sm: 'none' }
        }}
        onClick={() => setFormOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Container>
  )
}
