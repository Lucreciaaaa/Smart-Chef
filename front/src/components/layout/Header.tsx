import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import HistoryIcon from "@mui/icons-material/History";

type HeaderProps = {
  onOpen: () => void;
};

const Header = ({ onOpen }: HeaderProps) => {
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
          <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
            <RestaurantIcon
              sx={{ display: { xs: "none", sm: "flex" }, mr: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                fontSize: "large",
              }}
            >
              Smart Chef
            </Typography>
          </Box>

          <IconButton onClick={onOpen} color="inherit">
            <HistoryIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
