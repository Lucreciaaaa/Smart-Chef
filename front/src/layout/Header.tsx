import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        >
          <RestaurantIcon sx={{ display: { xs: "none", sm: "flex" }, mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              fontSize: "large",
              color: "inherit",
            }}
          >
            SmartChef
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
