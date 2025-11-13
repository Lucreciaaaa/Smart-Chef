import { Button, TextField, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function IngredientSearch() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        p: 1,
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ flexGrow: 1, minWidth: 200 }}
      >
        <TextField
          id="ingredient-input"
          label="Choose your ingredients"
          placeholder="Type an ingredient..."
          helperText="You can add between 3 and 10 ingredients"
          fullWidth
          size="medium"
        />
      </Box>

      <Button
        aria-label="Add an ingredient"
        variant="outlined"
        size="medium"
        sx={{
          minWidth: 0,
          padding: { xs: 0.5, sm: 1.5 },
          height: { xs: 40, sm: 56 },
          borderColor: "primary.main",
        }}
      >
        <AddIcon />
      </Button>

      <Button
        aria-label="Search"
        variant="contained"
        size="medium"
        sx={{
          p: { xs: 0.5, sm: 1.5 },
          height: { xs: 40, sm: 56 },
        }}
      >
        SEARCH
      </Button>
    </Box>
  );
}
