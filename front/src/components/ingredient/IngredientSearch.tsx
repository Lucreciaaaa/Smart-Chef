// Components
import { Button, TextField, Box } from "@mui/material";

// Icons
import AddIcon from "@mui/icons-material/Add";

// Redux
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addIngredient } from "../../store/ingredientSlice";

export default function IngredientSearch() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    dispatch(addIngredient(input.trim().toLowerCase()));
    console.log("ajout !");
    setInput("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="ingredient-input"
          label="Choose your ingredients"
          placeholder="Type an ingredient..."
          helperText="You can add up to 10 ingredients"
          fullWidth
          size="medium"
        />
      </Box>

      <Button
        aria-label="Add an ingredient"
        variant="outlined"
        size="medium"
        onClick={handleAdd}
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
