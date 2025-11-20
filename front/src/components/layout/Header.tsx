import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";

import HistoryIcon from "@mui/icons-material/History";

import logo from "../../assets/logo.png";

type HeaderProps = {
  onOpenDrawer: () => void;
};

const Header = ({ onOpenDrawer }: HeaderProps) => {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
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

          <IconButton onClick={onOpenDrawer} color="inherit">
            <HistoryIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
