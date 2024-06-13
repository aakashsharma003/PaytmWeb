import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundImage: `url(${"/not-found-image.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          startIcon={<HomeIcon />} // Add HomeIcon as the start icon
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
