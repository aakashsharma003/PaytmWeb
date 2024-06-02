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
        paddingX: { xs: "8%", sm: "5%", md: "4%", lg: "4%" },
        paddingY: { xs: "8%", sm: "5%", md: "4%", lg: "4%" },
        marginX: "1%",
        marginY: "2%",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Avatar
        sx={{
          bgcolor: color,
          width: { xs: "10vw", md: "3vw" },
          height: { xs: "10vw", md: "3vw" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden", // To ensure text does not overflow
        }}
      >
        <Typography
          variant="subtitle1"
          noWrap
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {profile}
        </Typography>
      </Avatar>
    </Box>
  );
};
