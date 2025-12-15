import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

import { grey } from "@mui/material/colors";

import { ScoredRecipe } from "../../types/recipe";

import { MAX_CARD_CHIPS } from "../../utils/constants";

type Props = {
  recipe: ScoredRecipe;
};

export default function RecipeCard({ recipe }: Props) {
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));

  const visibleChips = recipe.usedIngredients
    ? recipe.usedIngredients.slice(0, MAX_CARD_CHIPS)
    : [];
  const hiddenChipsCount = recipe.usedIngredients
    ? recipe.usedIngredients.length - visibleChips.length
    : 0;

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: { xs: 220, sm: 280, md: 320 },
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <CardActionArea
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardMedia
          aria-label="Recipe Image"
          component="img"
          image={`http://localhost:3001/${recipe.image}`}
          alt={recipe.title}
          sx={{ objectFit: "cover", height: { xs: 150, sm: 180, md: 200 } }}
        />
        <CardContent sx={{ flexGrow: 1, display: "flex" }}>
          <Stack direction="column" gap={0.5}>
            <Typography
              gutterBottom
              component="div"
              variant="subtitle1"
              sx={{
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.9rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.8em",
                lineHeight: 1.4,
              }}
            >
              {recipe.title}
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              gap={1.5}
            >
              {recipe.cookingTime && (
                <Stack direction="row" gap={0.5}>
                  <AccessTimeIcon fontSize="small" sx={{ color: grey[600] }} />
                  <Typography variant="body1" color="text.secondary">
                    {recipe.cookingTime} min
                  </Typography>
                </Stack>
              )}

              {recipe.servings && (
                <Stack direction="row" gap={0.5}>
                  <LocalDiningIcon fontSize="small" sx={{ color: grey[600] }} />
                  <Typography variant="body1" color="text.secondary">
                    {recipe.servings} servings
                  </Typography>
                </Stack>
              )}
            </Box>

            {recipe.overview && (
              <Typography variant="body2" color="text.secondary">
                {recipe.overview}
              </Typography>
            )}

            <Stack
              direction="row"
              sx={{ flexWrap: "wrap", gap: 1, mt: 1.5, pt: 0.5 }}
            >
              {visibleChips.map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  color="secondary"
                  variant="outlined"
                  size={isXS ? "small" : "medium"}
                />
              ))}

              {hiddenChipsCount > 0 && (
                <Chip
                  // TODO : add button >> tooltip
                  label={`+${hiddenChipsCount}`}
                  size={isXS ? "small" : "medium"}
                  sx={{
                    fontWeight: 500,
                    opacity: 0.7,
                  }}
                ></Chip>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
