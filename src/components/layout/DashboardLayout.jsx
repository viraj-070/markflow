import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ darkMode, setDarkMode }) {
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-sky-50/40 dark:bg-slate-950">
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="lg:pl-64">
          <div className="min-h-screen">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
