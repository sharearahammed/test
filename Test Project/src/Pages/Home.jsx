import { Box, Container } from "@mui/material";
import Test from "./Test/Test";

const Home = () => {
  return (
    <Container>
      <Box
        sx={{
          my: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Test/>
      </Box>
    </Container>
  );
};

export default Home;