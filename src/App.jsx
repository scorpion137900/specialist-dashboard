import React from "react";
import DirectionThemeProvider from "./Context/Direction";
import Router from "./routes/router";
const App = () => {
  return (
    <DirectionThemeProvider>
      <Router />
    </DirectionThemeProvider>
  );
};

export default App;
