import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Divider, Box } from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import PetCard from '../components/PetCard';
import { getUserPets } from '../services/users';
function MePets() {
  const { user } = useContext(UserContext);
  const [myPets, setMyPets] = useState([]);
  const [myInquiries, setMyInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userPetsData = await getUserPets();

        setMyPets(userPetsData.adopted_pets);
        setMyInquiries(userPetsData.inquiries);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* My Pets Section */}
      <Typography variant="h4" component="h1" gutterBottom>
        My Pets
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {myPets.length > 0 ? (
          myPets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <PetCard pet={pet} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>You haven't adopted any pets yet.</Typography>
          </Grid>
        )}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* My Inquiries Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        My Adoption Inquiries
      </Typography>
      <Grid container spacing={3}>
        {myInquiries.length > 0 ? (
          myInquiries.map((inquiry) => (
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
                        Your message: {inquiry.message}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: inquiry.status === 'Pending' ? 'warning.main' : 
                                   inquiry.status === 'Approved' ? 'success.main' : 
                                   'error.main'
                          }}
                        >
                          Status: {inquiry.status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>You haven't made any adoption inquiries yet.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default MePets; 