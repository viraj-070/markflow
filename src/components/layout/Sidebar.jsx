import React from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { FileText, PenSquare, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

const navigation = [
  { name: "All Posts", href: "/posts", icon: FileText },
  { name: "New Post", href: "/editor", icon: PenSquare },
];

export function Sidebar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <div
        className={cn(
          "lg:hidden fixed top-4 left-4 z-[80] transition-opacity",
          isOpen && "opacity-0 pointer-events-none",
        )}
      >
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-xl bg-white border-sky-200 text-sky-700 shadow-sm dark:bg-slate-900 dark:border-slate-700 dark:text-sky-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/55 z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-sky-100 dark:border-slate-700 z-[70] transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sky-100 dark:border-slate-700 relative">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden absolute top-4 right-4 h-9 w-9"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/markflow-logo.svg"
                alt="MarkFlow logo"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  MarkFlow
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Markdown Editor
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href === "/editor" &&
                  location.pathname.startsWith("/editor"));
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300"
                      : "text-gray-600 hover:bg-sky-50 dark:text-gray-400 dark:hover:bg-slate-800",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sky-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
