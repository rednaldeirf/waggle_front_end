import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import PreferencePage from './pages/PreferencePage';
import PetList from './pages/PetList';
import PetDetail from './pages/PetDetail';
import AdoptionForm from './pages/AdoptionForm';
import ShelterDashboard from './pages/ShelterDashboard';
import UserProfile from './pages/UserProfile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FF9800',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preferences" element={<PreferencePage />} />
          <Route path="/pets/:type" element={<PetList />} />
          <Route path="/pet/:id" element={<PetDetail />} />
          <Route path="/adopt/:petId" element={<AdoptionForm />} />
          <Route path="/shelter-dashboard" element={<ShelterDashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 