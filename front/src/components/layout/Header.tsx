import { AppBar, Toolbar, Typography, Box } from "@mui/material";

import logo from "../../assets/logo-on-dark.png";

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="SmartChef Logo"
            sx={{
              display: { xs: "none", sm: "flex" },
              height: 48,
              width: 48,
              mr: 1,
              justifyContent: "flex-start",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              fontSize: "large",
            }}
          >
            SmartChef
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
