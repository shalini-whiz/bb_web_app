import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { MuiThemeProvider } from '@material-ui/core/styles';
import setTheme from "./styles/customTheme"
import { Desktop, Tablet, Mobile, Default } from "./lib"

function App() {
  if (localStorage.getItem("theme") == null || localStorage.getItem("theme") == undefined)
    localStorage.setItem("theme", "light")
  return (
    <div className="App">
      <Desktop>
        <BrowserRouter>
          <MuiThemeProvider theme={setTheme(localStorage.getItem("theme"))}>
            <AppRoutes />
          </MuiThemeProvider>
        </BrowserRouter>
      </Desktop>
      <Tablet>
        <BrowserRouter>
          <MuiThemeProvider theme={setTheme(localStorage.getItem("theme"))}>
            <AppRoutes />
          </MuiThemeProvider>
        </BrowserRouter>
      </Tablet>
    </div>
  );
}

export default App;
