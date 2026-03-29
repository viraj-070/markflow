import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LandingPage } from "./pages/LandingPage";
import { EditorPage } from "./pages/EditorPage";
import { PostsPage } from "./pages/PostsPage";
import { ViewPage } from "./pages/ViewPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("markflow-dark-mode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return false; // Default to light mode
  });

  useEffect(() => {
    localStorage.setItem("markflow-dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className={darkMode ? "dark" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          />
          <Route
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          >
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/editor/:id" element={<EditorPage />} />
            <Route path="/view/:id" element={<ViewPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
