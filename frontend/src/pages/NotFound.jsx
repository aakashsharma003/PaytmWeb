import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
        backgroundColor: "#f5f5f5",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: "6rem", color: "#f44336" }} />
      <Typography variant="h3" component="h1" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
