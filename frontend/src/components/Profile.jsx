import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

export const Profile = ({ profile, color, onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: color,
        paddingX: { xs: "3vw", md: "1.8vw" },
        paddingY: { xs: "0.85vh", md: "2vh" },
        marginX: "1vw",
        marginY: "2vh",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Avatar
        sx={{
          bgcolor: color,
          width: { xs: "10vw", md: "2vw" },
          height: { xs: "10vw", md: "3vw" },
        }}
      >
        <Typography variant="subtitle1">{profile}</Typography>
      </Avatar>
    </Box>
  );
};
