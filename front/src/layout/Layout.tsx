import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./Header";
import RightDrawer from "./RightDrawer";
import IngredientSearch from "../components/ingredient/IngredientSearch";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header onOpen={handleDrawerOpen} />
      <RightDrawer openDrawer={open} onClose={handleDrawerClose} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
        }}
      >
        {children || <IngredientSearch />}
      </Box>
    </Box>
  );
}
