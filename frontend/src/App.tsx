import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";

import { PokeAPIProvider } from "./contexts/PokeAPIContext";
import { Detail } from "./pages/Detail";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <PokeAPIProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon/:id" element={<Detail />} />
              <Route path="/about-me" element={<div>About me</div>} />
              <Route path="/contact" element={<div>Contact</div>} />
              <Route path="/error" element={<div>error</div>} />
              <Route path="/*" element={<Navigate to="/error" />} />
            </Routes>
          </PokeAPIProvider>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
