import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { PokeAPIProvider } from "./contexts/PokeAPIContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <PokeAPIProvider>
            <AppRoutes />
          </PokeAPIProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
