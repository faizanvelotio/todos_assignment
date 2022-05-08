import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import theme from "src/assets/theme/theme";
import HomePageImage from "src/assets/images/home_page_img.jpg";

function Home() {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.push("/users");
  }, [history]);

  const displayHomePage = useCallback(
    () => (
      <Box
        sx={{
          padding: "1rem 2.5%",
          display: "flex",
          [theme.breakpoints.up("lg")]: {
            height: "85vh",
            alignItems: "center",
          },
          color: "#393D46",
        }}
      >
        <Grid
          container
          spacing={2}
          rowSpacing={3}
          columnSpacing={{ sm: 2, md: 3, xl: 5 }}
        >
          <Grid item xs={12} lg={6} sx={{ display: "flex" }}>
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
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              <Typography variant="pageHeading">Posts and Todos.</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
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
    ),
    [onClick]
  );
  return displayHomePage();
}

export default Home;
