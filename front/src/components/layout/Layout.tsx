import React, { useState } from "react";

import { Box, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./Header";
import RightDrawer from "./RightDrawer";
import IngredientSearch from "../ingredient/IngredientSearch";
import IngredientChip from "../ingredient/IngredientChip";
import RecipesContainer from "../recipe/RecipesContainer";

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
      <Header onOpenDrawer={handleDrawerOpen} />
      <RightDrawer openDrawer={open} onClose={handleDrawerClose} />

      {/* Main content */}
      <Stack
        component="main"
        direction="column"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          gap: 1,
        }}
      >
        {children || <IngredientSearch />}

        <IngredientChip />

        <Box mt={3}>
          <RecipesContainer />
        </Box>
      </Stack>
    </Box>
  );
}
