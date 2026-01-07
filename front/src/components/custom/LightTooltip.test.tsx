import { render, screen, fireEvent } from "@testing-library/react";
import LightTooltip from "./LightTooltip";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

it("should display a text on hover", async () => {
  render(
    <ThemeProvider theme={theme}>
      <LightTooltip title="Helper">
        <button>Test Button</button>
      </LightTooltip>
    </ThemeProvider>
  );

  const myButton = screen.getByText("Test Button");
  fireEvent.mouseOver(myButton);
  const displayedText = await screen.findByText("Helper");
  expect(displayedText).toBeInTheDocument();
});
