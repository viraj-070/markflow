import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  ArrowRight,
  Moon,
  Sun,
  FileText,
  Eye,
  Download,
  Palette,
  Tags,
  HardDrive,
  Code2,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Rich Markdown Editor",
    desc: "Full toolbar with headings, bold, italic, lists, code blocks, and more",
  },
  {
    icon: Eye,
    title: "Live Preview",
    desc: "See your content rendered in real-time as you type",
  },
  {
    icon: Tags,
    title: "Tag System",
    desc: "Organize your posts with an intuitive tag interface",
  },
  {
    icon: HardDrive,
    title: "Local Storage",
    desc: "Posts are saved automatically to your browser",
  },
  {
    icon: Download,
    title: "JSON Export",
    desc: "Export your posts for backup or integration",
  },
  {
    icon: Palette,
    title: "Dark & Light Mode",
    desc: "Switch between themes for comfortable editing",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    desc: "Works great on desktop, tablet, and mobile",
  },
  {
    icon: Code2,
    title: "Open Source",
    desc: "free to use and customize",
  },
];

export function LandingPage({ darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/markflow-logo.svg"
              alt="MarkFlow logo"
              className="w-9 h-9 rounded-lg"
            />
            <span className="text-lg font-semibold">MarkFlow</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/viraj-070/markflow"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {/* <Github className="w-4 h-4" /> */}
              GitHub
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link to="/editor">
              <Button size="sm">
                Try Editor
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-sm font-medium mb-6">
            <Code2 className="w-4 h-4" />
            Open Source
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Markdown Editor
            <span className="block text-gray-400 dark:text-gray-500">
              for Modern Apps
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            A clean, embeddable React markdown editor with live preview. Perfect
            for admin panels, blogs, documentation, and content management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/editor">
              <Button size="lg" className="w-full sm:w-auto px-6">
                Start Writing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/posts">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6"
              >
                View Posts
              </Button>
            </Link>
          </div>

          {/* Tech badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {["React", "Tailwind CSS", "Zustand", "Vite"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Everything You Need
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Features built for developers and content creators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Quick Start</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Get up and running in seconds
          </p>

          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <code className="text-sm text-gray-300 font-mono">
              <span className="text-gray-500">$</span> git clone
              https://github.com/yourname/markflow.git
              <br />
              <span className="text-gray-500">$</span> cd markflow
              <br />
              <span className="text-gray-500">$</span> npm install
              <br />
              <span className="text-gray-500">$</span> npm run dev
            </code>
          </div>
        </div>
      </section>
    </div>
  );
}
