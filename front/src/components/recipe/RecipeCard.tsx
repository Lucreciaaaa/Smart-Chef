import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

import { grey } from "@mui/material/colors";

import { Recipe } from "../../types/recipe";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  const demoChips = ["spaghetti", "tomatoes", "olive oil"];

  return (
    <Card
      sx={{
        w: "100%",
        maxWidth: { xs: 200, sm: 250, md: 300 },
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          // TODO : Add height
          image={`http://localhost:3001/${recipe.image}`}
          alt={recipe.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Stack direction="column" gap={1}>
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

            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
              {demoChips.map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
