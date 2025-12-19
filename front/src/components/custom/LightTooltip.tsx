import { TooltipProps, Tooltip, tooltipClasses, styled } from "@mui/material";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12,
    borderRadius: "4px",
    padding: "4px 8px",
    fontWeight: 500,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    "&:before": {
      border: "1px solid #dadde9",
    },
  },
}));

export default LightTooltip;
