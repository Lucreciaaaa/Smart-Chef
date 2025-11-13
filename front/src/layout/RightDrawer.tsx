import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = { xs: "90vw", sm: "50vw", md: 340 };

type DrawerProps = {
  openDrawer: boolean;
  onClose: () => void;
};

const RightDrawer = ({ openDrawer, onClose }: DrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          p: 2,
        },
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          History
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Drawer Content */}
      <Box sx={{ px: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Your recent activity will appear here
        </Typography>
      </Box>
    </Drawer>
  );
};

export default RightDrawer;
