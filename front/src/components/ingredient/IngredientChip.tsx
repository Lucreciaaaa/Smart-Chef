import { Chip, Stack, useMediaQuery } from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeIngredient } from "../../store/ingredientSlice";
import { resetRecipes } from "../../store/recipeSlice";

const IngredientChip = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const chips = useSelector((state: RootState) => state.ingredients.list);
  const dispatch = useDispatch();

  const handleDelete = (chip: string) => {
    dispatch(removeIngredient(chip));
    dispatch(resetRecipes());
  };

  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.5 }}>
      {chips.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          size={isMobile ? "small" : "medium"}
          color="secondary"
          onDelete={() => handleDelete(chip)}
        />
      ))}
    </Stack>
  );
};

export default IngredientChip;
