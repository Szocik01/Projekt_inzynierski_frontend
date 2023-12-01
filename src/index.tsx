import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./storage/redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Secular One", "sans-serif"].join(","),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiInputLabel-root.Mui-focused": {
            color: "#00F800",
          },
          ".MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00F800",
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);
