import React from 'react';
import { Button, Container, Typography, Card, CardContent, Avatar, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import waggleLogo from '../assets/Waggle(orange).png';

// Testimonials and FAQs
const testimonials = [
  {
    name: "Alex P.",
    text: "Waggle made finding my new best friend so easy and stress-free.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Samantha R.",
    text: "As a shelter, Waggle helped us connect with more loving families than ever before.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const faqs = [
  {
    q: "Is Waggle free to use?",
    a: "Yes! Waggle is completely free for adopters and shelters."
  },
  {
    q: "How do I know the pets are available?",
    a: "All listings are updated in real-time by our partner shelters."
  },
  {
    q: "Can I visit the pet before adopting?",
    a: "Absolutely! You can schedule a visit with the shelter through Waggle."
  }
];

const LandingPage = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>

      {/* LOGO + HEADLINE */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img 
          src={waggleLogo} 
          alt="Waggle Logo" 
          style={{ width: '120px', marginBottom: '20px', borderRadius: '12px' }} 
        />
        <Typography variant="h3" gutterBottom>Find Your New Best Friend with Waggle</Typography>
        <Typography variant="h6" color="text.secondary" style={{ marginBottom: '20px' }}>
          The easiest way to adopt a pet from local shelters.
        </Typography>
        <Button variant="contained" color="primary" size="large" href="/register">Get Started</Button>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h4" gutterBottom>How Waggle Works</Typography>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <Card style={{ flex: '1 1 250px' }}>
            <CardContent>
              <Typography variant="h6">1. Create Your Profile</Typography>
              <Typography>Sign up and tell us about yourself or your organization.</Typography>
            </CardContent>
          </Card>
          <Card style={{ flex: '1 1 250px' }}>
            <CardContent>
              <Typography variant="h6">2. Browse Pets</Typography>
              <Typography>Explore a list of pets looking for homes.</Typography>
            </CardContent>
          </Card>
          <Card style={{ flex: '1 1 250px' }}>
            <CardContent>
              <Typography variant="h6">3. Apply & Adopt</Typography>
              <Typography>Submit your adoption request and connect with a shelter!</Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* BENEFITS */}
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h4" gutterBottom>Why Choose Waggle?</Typography>
        <ul style={{ fontSize: '1.1rem' }}>
          <li>Simple, fast, and secure adoption process</li>
          <li>Connect directly with trusted shelters</li>
          <li>Personalized pet recommendations</li>
          <li>Track your adoption status</li>
        </ul>
      </div>

      {/* MISSION */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Typography variant="h4" gutterBottom>Our Mission</Typography>
        <Typography color="text.secondary">
          Waggle was founded by animal lovers who believe every pet deserves a loving home.
        </Typography>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h4" gutterBottom>Success Stories</Typography>
        {testimonials.map((t, index) => (
          <Card key={index} style={{ marginBottom: '20px' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={t.avatar} style={{ marginRight: '16px' }} />
              <div>
                <Typography variant="subtitle1">{t.name}</Typography>
                <Typography variant="body2" color="text.secondary">{t.text}</Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h4" gutterBottom>FAQs</Typography>
        {faqs.map((faq, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>{faq.q}</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* FINAL CTA */}
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Ready to meet your new best friend?</Typography>
        <Button variant="contained" color="primary" size="large" href="/register">
          Start Your Journey with Waggle
        </Button>
      </div>

    </div>
  );
};

export default LandingPage;