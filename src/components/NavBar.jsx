import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { signOut } from '../services/users';
import waggleLogo from '../assets/Waggle(orange).png';

// Simple NavBar component that shows different options based on whether user is logged in
const NavBar = () => {
  // Get the current user from our context
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Function to handle signing out
  const handleSignOut = () => {
    signOut();
    setUser(null);
    navigate('/');
  };

  return (
    // Main navigation bar container
    <nav style={{
      backgroundColor: 'white',
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Left side - Logo and brand name */}
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={waggleLogo}
            alt="Waggle Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Waggle</h1>
        </div>
      </Link>

      {/* Right side - Navigation links */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {user ? (
          // If user is logged in, show these options
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Show different options based on user type */}
            {user.is_shelter_owner ? (
              // Shelter owner options
              <Link 
                to="/shelter-dashboard" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#4CAF50',
                  padding: '8px 16px',
                  border: '1px solid #4CAF50',
                  borderRadius: '4px'
                }}
              >
                Our Pets
              </Link>
            ) : (
              // Regular user options
              <>
                <Link 
                  to="/my-pets" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#4CAF50',
                    padding: '8px 16px',
                    border: '1px solid #4CAF50',
                    borderRadius: '4px'
                  }}
                >
                  My Pets
                </Link>
                <Link 
                  to="/preferences" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#4CAF50',
                    padding: '8px 16px',
                    border: '1px solid #4CAF50',
                    borderRadius: '4px'
                  }}
                >
                  Preferences
                </Link>
                <Link 
                  to="/pets" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#4CAF50',
                    padding: '8px 16px',
                    border: '1px solid #4CAF50',
                    borderRadius: '4px'
                  }}
                >
                  Pet List
                </Link>
              </>
            )}
            {/* Sign out button */}
            <button
              onClick={handleSignOut}
              style={{
                padding: '8px 16px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
            {/* Show user/shelter name */}
            <span style={{ marginLeft: '10px' }}>
              {user.username || user.shelter_name}
            </span>
          </div>
        ) : (
          // If user is not logged in, show these options
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link 
              to="/register" 
              style={{ 
                textDecoration: 'none', 
                color: '#4CAF50',
                padding: '8px 16px',
                border: '1px solid #4CAF50',
                borderRadius: '4px'
              }}
            >
              Sign Up
            </Link>
            <Link 
              to="/" 
              style={{ 
                textDecoration: 'none', 
                color: 'white',
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                borderRadius: '4px'
              }}
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
