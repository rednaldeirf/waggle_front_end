import React, { useState, useEffect, useContext } from 'react'
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { getShelterInquiries, updateInquiryStatus, deleteInquiry } from '../services/shelters'

export default function ShelterInquiries() {
  const { user, shelter } = useContext(UserContext)
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [inquiryToDelete, setInquiryToDelete] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    if (shelter) {
      console.log("Shelter data in ShelterInquiries:", {
        id: shelter.id,
        name: shelter.name,
        fullData: shelter
      });
      loadInquiries();
    } else {
      console.log("No shelter data available in ShelterInquiries");
    }
  }, [shelter]);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      console.log("Loading inquiries for shelter ID:", shelter.id);
      const data = await getShelterInquiries(shelter.id);
      console.log("Received inquiries data:", data);
      setInquiries(data);
      setError(null);
    } catch (err) {
      console.error('Error loading inquiries:', err);
      console.error('Error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      setError('Failed to load inquiries');
      showSnackbar('Failed to load inquiries', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleStatusUpdate = async (inquiry, newStatus) => {
    try {
      await updateInquiryStatus(inquiry.pet.id, inquiry.id, newStatus)
      showSnackbar(`Inquiry ${newStatus.toLowerCase()} successfully`, 'success')
      loadInquiries()
    } catch (err) {
      console.error('Error updating inquiry status:', err)
      showSnackbar(`Failed to ${newStatus.toLowerCase()} inquiry`, 'error')
    }
  }

  const handleDeleteClick = (inquiry) => {
    setInquiryToDelete(inquiry)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!inquiryToDelete) return

    try {
      await deleteInquiry(inquiryToDelete.pet.id, inquiryToDelete.id)
      setDeleteDialogOpen(false)
      setInquiryToDelete(null)
      showSnackbar('Inquiry deleted successfully', 'success')
      loadInquiries()
    } catch (err) {
      console.error('Error deleting inquiry:', err)
      showSnackbar('Failed to delete inquiry', 'error')
    }
  }

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  if (loading) {
    return (
      <Container>
        <Typography>Loading inquiries...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Adoption Inquiries
      </Typography>
      <Grid container spacing={3}>
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <Grid item xs={12} key={inquiry.id}>
              <Card>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={inquiry.pet.image_url}
                      alt={inquiry.pet.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {inquiry.pet.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {inquiry.pet.breed} • {inquiry.pet.age} years old
                      </Typography>
                      <Typography variant="body1" paragraph>
                        From: {inquiry.user.username}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Message: {inquiry.message}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: inquiry.status === 'Pending' ? 'warning.main' : 
                                   inquiry.status === 'Accepted' ? 'success.main' : 
                                   'error.main'
                          }}
                        >
                          Status: {inquiry.status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        {inquiry.status === 'Pending' && (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleStatusUpdate(inquiry, 'Accepted')}
                            >
                              Approve
                            </Button>
                            {/* <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleStatusUpdate(inquiry, 'Rejected')}
                            >
                              Reject
                            </Button> */}
                          </>
                        )}
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteClick(inquiry)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No inquiries found.</Typography>
          </Grid>
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Inquiry</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this inquiry? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
} 