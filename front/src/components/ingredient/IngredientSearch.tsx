// MUI
import {
  Button,
  TextField,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Icons
import AddIcon from "@mui/icons-material/Add";

// Custom Components
import LightTooltip from "../custom/LightTooltip";

// hooks
import { useIngredientForm } from "../../hooks/useIngredientForm";

// constants
import { MAX_INGREDIENTS, MIN_INGREDIENTS } from "../../utils/constants";

const commonButtonSx = {
  p: { xs: 0.5, sm: 1.5 },
  height: { xs: "40px", sm: "56px" },
  fontSize: { xs: "0.75rem", sm: "0.875rem" },
  flexShrink: 0,
};

export default function IngredientSearch() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const {
    input,
    error,
    ingredientList,
    handleChange,
    handleAdd,
    handleClearAll,
    handleSearch,
  } = useIngredientForm();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: { xs: 0.5, sm: 1 },
        flexWrap: "nowrap",
        width: "100%",
      }}
    >
      {/* INPUT BAR Section */}
      <Box
        width="60%"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <TextField
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          error={!!error}
          id="ingredient-input"
          label={isMobile ? "Ingredients" : "Choose your ingredients"}
          placeholder="Type..."
          helperText={
            error || `You can add up to ${MAX_INGREDIENTS} ingredients`
          }
          fullWidth
          size={isMobile ? "small" : "medium"}
          slotProps={{
            input: {
              sx: { fontSize: { xs: "0.85rem", sm: "1rem" } },
            },
            formHelperText: {
              sx: { display: { xs: "none", sm: "block" } },
            },
          }}
        />
      </Box>

      {/* ADD (+) Button */}
      <Button
        aria-label="Add an ingredient"
        variant="outlined"
        onClick={handleAdd}
        disabled={ingredientList.length >= MAX_INGREDIENTS}
        sx={{
          ...commonButtonSx,
          minWidth: { xs: "40px", sm: "56px" },
          borderColor: "primary.main",
        }}
      >
        <AddIcon fontSize={isMobile ? "small" : "medium"} />
      </Button>

      {/* SEARCH Button */}
      <LightTooltip
        title={
          ingredientList.length < MIN_INGREDIENTS ? (
            <Typography variant="caption">
              Add at least {MIN_INGREDIENTS} ingredients
            </Typography>
          ) : (
            ""
          )
        }
        placement="bottom-start"
        arrow
      >
        <Box sx={{ display: "inline-block" }}>
          <Button
            disabled={ingredientList.length < MIN_INGREDIENTS}
            onClick={handleSearch}
            variant="contained"
            sx={commonButtonSx}
          >
            SEARCH
          </Button>
        </Box>
      </LightTooltip>

      {/* CLEAR Button */}
      <Button
        onClick={handleClearAll}
        variant="outlined"
        color="secondary"
        sx={commonButtonSx}
      >
        CLEAR
      </Button>
    </Box>
  );
}
