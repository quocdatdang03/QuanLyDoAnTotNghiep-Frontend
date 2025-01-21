import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "./theme/LightTheme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Routers from "./router/Routers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isTokenExpired, setupAxiosInterceptors } from "./config/api";
import { getUserInfoAction } from "./redux/Auth/Action";

export default function App() {
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);

  const jwtToken = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (jwtToken) {
      // Setup axios với jwtToken hiện tại
      // setupAxiosInterceptors(jwtToken);

      dispatch(getUserInfoAction());
    }
  }, [jwtToken]);

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
