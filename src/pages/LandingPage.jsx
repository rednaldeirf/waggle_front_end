import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Grid,
  Paper,
  CardMedia,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Chip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Pets as PetsIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  EmojiEvents as EmojiEventsIcon,
  Group as GroupIcon,
  LocalHospital as LocalHospitalIcon
} from '@mui/icons-material';
import waggleLogo from "../assets/Waggle(orange).png";
import { signIn as userSignIn } from "../services/users";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

// Testimonials and FAQs
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Dog Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "Waggle made finding my perfect companion so easy. The adoption process was smooth and the support was incredible!"
  },
  {
    name: "Michael Chen",
    role: "Cat Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "I found my best friend through Waggle. The platform's user-friendly interface and detailed pet profiles were amazing."
  },
  {
    name: "Emma Rodriguez",
    role: "Multiple Pet Owner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "As a shelter volunteer, I've seen how Waggle has helped so many animals find their forever homes. It's truly making a difference."
  }
];
const faqs = [
  {
    question: "How does the adoption process work?",
    answer: "Our adoption process is simple: browse available pets, submit an inquiry, meet the pet, and complete the adoption paperwork. Our team guides you through each step."
  },
  {
    question: "What are the adoption fees?",
    answer: "Adoption fees vary by shelter and typically cover spaying/neutering, vaccinations, and microchipping. Contact the shelter for specific details."
  },
  {
    question: "Can I return a pet if it doesn't work out?",
    answer: "Yes, we have a return policy to ensure the best match for both pets and families. Contact the shelter within the specified period if you need to return a pet."
  }
];
const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [signInForm, setSignInForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const { setUser, setShelter } = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
    setSignInForm({ username: "", password: "" });
  };
  const handleChange = (e) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userData = await userSignIn(signInForm);

      setUser(userData.user);
      setShelter(userData.shelter);
      
      if (!userData.shelter) {
        navigate("/preferences");
      } else {
        navigate("/shelter-dashboard");
      }

      handleClose();
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      handleOpen();
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Find Your Perfect
                  <Box component="span" sx={{ color: 'secondary.main', display: 'block' }}>
                    Furry Friend
                  </Box>
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Connect with local shelters and give a loving home to pets in need
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleOpen}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    '&:hover': {
                      bgcolor: 'grey.100'
                    }
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Happy dog"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  transform: 'rotate(-2deg)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            How Waggle Works
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Our simple process makes it easy to find and adopt your perfect companion
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: <SearchIcon sx={{ fontSize: 40 }} />,
              title: "Browse Pets",
              description: "Explore our extensive database of pets available for adoption"
            },
            {
              icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
              title: "Connect",
              description: "Submit an inquiry and connect with the shelter"
            },
            {
              icon: <HomeIcon sx={{ fontSize: 40 }} />,
              title: "Adopt",
              description: "Complete the adoption process and welcome your new family member"
            }
          ].map((step, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  {step.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {step.title}
                </Typography>
                <Typography color="text.secondary">
                  {step.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Why Choose Waggle?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              We're committed to making pet adoption simple, safe, and successful
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <SecurityIcon sx={{ fontSize: 40 }} />,
                title: "Verified Shelters",
                description: "All our partner shelters are thoroughly vetted and verified"
              },
              {
                icon: <SupportIcon sx={{ fontSize: 40 }} />,
                title: "24/7 Support",
                description: "Our team is always here to help you through the adoption process"
              },
              {
                icon: <PetsIcon sx={{ fontSize: 40 }} />,
                title: "Happy Pets",
                description: "We ensure all pets are healthy and ready for their new homes"
              }
            ].map((benefit, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    bgcolor: 'transparent'
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Success Stories Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Success Stories
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Hear from families who found their perfect match through Waggle
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid white',
                    boxShadow: 1
                  }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ pt: 4, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {testimonial.role}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    "{testimonial.quote}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />, value: "1000+", label: "Happy Adoptions" },
              { icon: <GroupIcon sx={{ fontSize: 40 }} />, value: "50+", label: "Partner Shelters" },
              { icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />, value: "100%", label: "Vetted Pets" }
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                  <Typography variant="h3" component="div" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6">{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Everything you need to know about adopting through Waggle
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {faq.question}
                </Typography>
                <Typography color="text.secondary">
                  {faq.answer}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: { xs: 3, md: 6 },
              textAlign: 'center',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white'
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Find Your Perfect Match?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of happy pet owners who found their companions through Waggle
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Sign In Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Sign In</Typography>
          <IconButton
            onClick={handleClose}
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={signInForm.username}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={signInForm.password}
              onChange={handleChange}
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleClose}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default LandingPage;