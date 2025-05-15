import React, { useState } from "react";
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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import waggleLogo from "../assets/Waggle(orange).png";
import { signIn as userSignIn } from "../services/users";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
// Testimonials and FAQs
const testimonials = [
  {
    name: "Emre",
    text: "Waggle made finding my new best friend so easy and stress-free.",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    name: "Raul",
    text: "As a shelter, Waggle helped us connect with more loving families than ever before.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];
const faqs = [
  {
    q: "Is Waggle free to use?",
    a: "Yes! Waggle is completely free for adopters and shelters.",
  },
  {
    q: "How do I know the pets are available?",
    a: "All listings are updated in real-time by our partner shelters.",
  },
  {
    q: "Can I visit the pet before adopting?",
    a: "Absolutely! You can schedule a visit with the shelter through Waggle.",
  },
];
const LandingPage = ({ }) => {
  const [open, setOpen] = useState(false);
  const [signInForm, setSignInForm] = useState({ username: "", password: "" });
  const [signInType, setSignInType] = useState("user");
  const [error, setError] = useState("");

  const { setUser, setShelter } = useContext(UserContext);
  const navigate = useNavigate();

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
      
      if (signInType === "user") {
        user = await userSignIn(signInForm);
        navigate("/preferences");
      } else {
        navigate("/shelter-dashboard");
      }

      handleClose();
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      {/* LOGO + HEADLINE */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img
          src={waggleLogo}
          alt="Waggle Logo"
          style={{ width: "120px", marginBottom: "20px", borderRadius: "12px" }}
        />
        <Typography variant="h3" gutterBottom>
          Find Your New Best Friend with Waggle
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          style={{ marginBottom: "20px" }}
        >
          The easiest way to adopt a pet from local shelters.
        </Typography>
        <div className="Sign-up">
          <div
            style={{ display: "flex", justifyContent: "center", gap: "16px" }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/register"
            >
              Sign-Up
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleOpen}
            >
              Sign In
            </Button>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Sign In</DialogTitle>
          <ToggleButtonGroup
            value={signInType}
            exclusive
            onChange={(e, newType) => {
              if (newType) setSignInType(newType);
            }}
            sx={{ mb: 2, width: "100%" }}
          >
            <ToggleButton value="user" sx={{ flex: 1 }}>
              User
            </ToggleButton>
            <ToggleButton value="shelter" sx={{ flex: 1 }}>
              Shelter
            </ToggleButton>
          </ToggleButtonGroup>
          <form onSubmit={handleSignIn}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Username"
                name="username"
                fullWidth
                value={signInForm.username}
                onChange={handleChange}
                required
              />
              <TextField
                margin="dense"
                label="Password"
                name="password"
                type="password"
                fullWidth
                value={signInForm.password}
                onChange={handleChange}
                required
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
      {/* HOW IT WORKS */}
      <div className="how-waggle-works">
        <h2>How Waggle Works</h2>
        <div className="waggle-cards">
          <div className="waggle-card">
            <h3>1. Create Your Profile</h3>
            <p>Sign up and tell us about yourself or your organization.</p>
          </div>
          <div className="waggle-card">
            <h3>2. Browse Pets</h3>
            <p>Explore a list of pets looking for homes.</p>
          </div>
          <div className="waggle-card">
            <h3>3. Apply & Adopt</h3>
            <p>Submit your adoption request and connect with a shelter!</p>
          </div>
        </div>
      </div>
      {/* BENEFITS */}
      <div style={{ marginBottom: "40px" }}>
        <Typography variant="h4" gutterBottom>
          Why Choose Waggle?
        </Typography>
        <ul style={{ fontSize: "1.1rem" }}>
          <li>Simple, fast, and secure adoption process</li>
          <li>Connect directly with trusted shelters</li>
          <li>Personalized pet recommendations</li>
          <li>Track your adoption status</li>
        </ul>
      </div>
      {/* MISSION */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography color="text.secondary">
          Waggle was founded by animal lovers who believe every pet deserves a
          loving home.
        </Typography>
      </div>
      {/* TESTIMONIALS */}
      <div style={{ marginBottom: "40px" }}>
        <Typography variant="h4" gutterBottom>
          Success Stories
        </Typography>
        {testimonials.map((t, index) => (
          <Card key={index} style={{ marginBottom: "20px" }}>
            <CardContent style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={t.avatar} style={{ marginRight: "16px" }} />
              <div>
                <Typography variant="subtitle1">{t.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.text}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* FAQ */}
      <div style={{ marginBottom: "40px" }}>
        <Typography variant="h4" gutterBottom>
          FAQs
        </Typography>
        {faqs.map((faq, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <strong>{faq.q}</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      {/* FINAL CTA */}
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Ready to meet your new best friend?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/register"
        >
          Start Your Journey with Waggle
        </Button>
      </div>
    </div>
  );
};
export default LandingPage;