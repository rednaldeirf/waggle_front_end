// import React from "react";

// function PetCard({ pet, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         width: 260,
//         borderRadius: 16,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
//         background: "#fff",
//         cursor: "pointer",
//         overflow: "hidden",
//         margin: "16px",
//         transition: "transform 0.15s",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//       tabIndex={0}
//       aria-label={`View details for ${pet.name}`}
//       onKeyPress={e => { if (e.key === "Enter") onClick(); }}
//     >
//       <img
//         src={pet.image_url}
//         alt={pet.name}
//         style={{
//           width: "100%",
//           height: 180,
//           objectFit: "cover",
//           borderTopLeftRadius: 16,
//           borderTopRightRadius: 16,
//         }}
//       />
//       <div style={{ padding: "16px", width: "100%", textAlign: "center" }}>
//         <h2 style={{ margin: "0 0 8px 0", fontSize: "1.3rem" }}>{pet.name}</h2>
//         {pet.breed && (
//           <div style={{ color: "#888", fontSize: "1rem", marginBottom: 4 }}>
//             {pet.breed}
//           </div>
//         )}
//         {pet.bio && (
//           <div style={{ color: "#555", fontSize: "0.95rem", marginBottom: 4 }}>
//             {pet.bio.length > 60 ? pet.bio.slice(0, 60) + "..." : pet.bio}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PetCard;



// src/components/PetCard.jsx
import React from 'react'
import { Chip, Box, Card, CardMedia, CardContent, Typography, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'

export default function PetCard({ pet, onClick, onDelete, isDashboard = false }) {
  const { name, description, age, species, breed, image_url, is_adopted } = pet

  // Optional: truncate description
  const shortDesc =
    description?.length > 100
      ? description.slice(0, 100) + '…'
      : description

  return (
    <Card
      sx={{
        width: '280px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {image_url && (
          <CardMedia
            component="img"
            height="200"
            image={image_url}
            alt={name}
            onClick={onClick}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        )}
        <Chip
          icon={is_adopted ? <CheckCircleIcon /> : <CancelIcon />}
          label={is_adopted ? "Adopted" : "Available"}
          color={is_adopted ? "success" : "error"}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontWeight: 'bold'
          }}
        />
      </Box>
      <CardContent sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        p: 2
      }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {species} • {breed} • {age} {age === 1 ? 'year' : 'years'} old
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ flex: 1 }}>
          {shortDesc}
        </Typography>
        {isDashboard && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(pet.id)}
            sx={{ mt: 2 }}
          >
            Delete Pet
          </Button>
        )}
      </CardContent>
    </Card>
  )
}




