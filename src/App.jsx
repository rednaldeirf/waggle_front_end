import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import PreferencePage from './pages/PreferencePage';
import PetList from './pages/PetList';
import PetDetail from './pages/PetDetail';
import ShelterDashboard from './pages/ShelterDashboard';
import UserProfile from './pages/UserProfile';
import MePets from './pages/MePets';
import ShelterInquiries from './pages/ShelterInquiries';
import PrivateRoute from './components/PrivateRoute';

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
          <Route path="/shelter-dashboard" element={
            <PrivateRoute>
              <ShelterDashboard />
            </PrivateRoute>
          } />
          <Route path="/user-profile" element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } />
          <Route path="/my-pets" element={
            <PrivateRoute>
              <MePets />
            </PrivateRoute>
          } />
          <Route path="/shelter/inquiries" element={
            <PrivateRoute>
              <ShelterInquiries />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 