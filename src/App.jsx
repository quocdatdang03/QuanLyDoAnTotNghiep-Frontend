import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "./theme/LightTheme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Routers from "./router/Routers";

export default function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
