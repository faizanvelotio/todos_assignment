import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import HomePageImage from "src/static/images/home_page_img.jpg";
import theme from "src/mui/theme";
function Home() {
  const history = useHistory();

  const onClick = () => {
    history.push("/users");
  };

  return (
    <Box
      sx={{
        padding: "1rem 2.5%",
        display: "flex",
        [theme.breakpoints.up("sm")]: {
          height: "85vh",
          alignItems: "center",
        },
      }}
    >
      <Grid
        container
        spacing={2}
        rowSpacing={3}
        columnSpacing={{ sm: 2, md: 3, xl: 5 }}
      >
        <Grid item xs={12} sm={7} lg={6} sx={{ display: "flex" }}>
          <img
            src={HomePageImage}
            alt="Girl doing tasks"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "50%",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5} lg={6}>
          <Stack spacing={3}>
            <Typography variant="mainPageHeading">Posts and Todos.</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Button
              variant="contained"
              onClick={onClick}
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                width: "fit-content",
                alignSelf: "center",
              }}
            >
              <Typography variant="body1">Go to Users</Typography>
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
