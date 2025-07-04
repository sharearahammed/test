import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router";

const Home = () => {
  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", fontSize: "40px", fontWeight: 600 }}
      >
        Welcome
      </Typography>
      <Box
        sx={{
          my: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Link to="/comments">View Comments</Link>
        <Link to="/users">Draggable User List</Link>
      </Box>
    </Container>
  );
};

export default Home;
