// MUI
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
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { grey } from "@mui/material/colors";

import { ScoredRecipe } from "../../../types/recipe";
import { MAX_CARD_CHIPS } from "../../../utils/constants";

import LightTooltip from "../../custom/LightTooltip";

import logo from "../../../assets/logo.png";

type Props = {
  recipe: ScoredRecipe;
  onSelectRecipe: () => void;
};

export default function RecipeCard({ recipe: r, onSelectRecipe }: Props) {
  const isXS = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { usedIngredients, id, title, image, cookingTime, servings, overview } =
    r;

  const imageSrc = image || logo;

  const ingredients = usedIngredients ?? [];
  const visibleChips = ingredients.slice(0, MAX_CARD_CHIPS);
  const hiddenChips = ingredients.slice(MAX_CARD_CHIPS);
  const hiddenChipsCount = hiddenChips.length;
  const tooltipTitle = hiddenChipsCount > 0 ? hiddenChips.join(", ") : "";

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
        onClick={onSelectRecipe}
        aria-labelledby={`recipe-title-${id}`}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardMedia
          component="img"
          image={imageSrc}
          alt={image ? title : "No image available"}
          sx={{
            objectFit: "cover",
            height: { xs: 150, sm: 180, md: 200 },
            filter: image ? "none" : "grayscale(100%)",
            bgcolor: image ? "transparent" : grey[300],
          }}
        />
        <CardContent sx={{ flexGrow: 1, display: "flex" }}>
          <Stack direction="column" gap={0.5}>
            <Typography
              id={`recipe-title-${id}`}
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
              {title}
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              gap={1.5}
            >
              {cookingTime && (
                <Stack direction="row" gap={0.5}>
                  <AccessTimeIcon fontSize="small" sx={{ color: grey[600] }} />
                  <Typography variant="body1" color="text.secondary">
                    {cookingTime} min
                  </Typography>
                </Stack>
              )}

              {servings && (
                <Stack direction="row" gap={0.5}>
                  <LocalDiningIcon fontSize="small" sx={{ color: grey[600] }} />
                  <Typography variant="body1" color="text.secondary">
                    {servings} servings
                  </Typography>
                </Stack>
              )}
            </Box>

            {overview && (
              <Typography variant="body2" color="text.secondary">
                {overview}
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
                <LightTooltip title={tooltipTitle} placement="right" arrow>
                  <Chip
                    label={`+${hiddenChipsCount}`}
                    variant="filled"
                    size={isXS ? "small" : "medium"}
                    sx={{
                      opacity: 0.6,
                    }}
                  ></Chip>
                </LightTooltip>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
