// Components
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  LinearProgress,
} from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { ScoredRecipe } from "../../../types/recipe";

import { getMatchLabel } from "../../../utils/indicator";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  selectedRecipe: ScoredRecipe | null;
};

export default function RecipeDialog({
  open,
  onClose,
  selectedRecipe,
}: DialogProps) {
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  if (!selectedRecipe) return null;

  const getScoreColor = (score: number) => {
    if (score >= 70) return "success"; // green
    if (score >= 40) return "warning"; // orange
    return "error"; // red
  };

  const score = selectedRecipe.normalizedMatchScore;
  const color = getScoreColor(score);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          bgcolor: "background.paper",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" fontWeight="750">
          {selectedRecipe.title}
        </Typography>
        <IconButton
          onClick={onClose}
          aria-label="close"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2, md: 4 } }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          {/* Left column : Image, Score & Ingredients */}
          <Box sx={{ width: { xs: "100%", md: "300px" }, flexShrink: 0 }}>
            <Box
              component="img"
              src={selectedRecipe.image}
              alt={
                selectedRecipe.image
                  ? selectedRecipe.title
                  : "No image available"
              }
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
                mb: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: `${color}.main`, fontWeight: "bold" }}
                gutterBottom
              >
                {getMatchLabel(score)} ({score}%)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={score}
                color={color}
                sx={{ height: 8, borderRadius: 5 }}
              />
            </Box>

            <Stack spacing={2}>
              <Typography
                variant="h6"
                sx={{ fontSize: "1.1rem", fontWeight: 650 }}
              >
                Ingredients
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {selectedRecipe.ingredients.map((ing, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body2"
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    <Box
                      component="span"
                      sx={{ color: "text.primary", fontWeight: 500 }}
                    >
                      {ing.amount}
                    </Box>
                  </Typography>
                ))}
              </Box>
            </Stack>
          </Box>

          {/* Left column : Steps */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 650,
              }}
            >
              <MenuBookIcon color="primary" /> Instructions
            </Typography>

            <Stack spacing={3} sx={{ mt: 2 }}>
              {selectedRecipe.steps.map((step, index) => (
                <Box key={index} display="flex" gap={2}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: "primary.light",
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      mt: 0.5,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.primary", lineHeight: 1.7 }}
                  >
                    {step}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
