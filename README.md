# MarkFlow

A simple, modern, open-source React markdown editor with live preview. Built for developers who need a clean content editor for admin panels, CMS tools, or any project requiring markdown editing.

## Features

- **Split Screen Editor** - Write markdown on the left, see live preview on the right
- **Rich Toolbar** - Format text with headings, bold, italic, lists, quotes, code blocks
- **Live Preview** - Real-time rendering as you type
- **Tag System** - Organize posts with a clean tag/chip interface
- **Local Storage** - Posts automatically saved to browser storage
- **JSON Export** - Export posts as JSON files for backup or integration
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Zustand (state management)
- React Hook Form
- React Markdown
- React Router DOM
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/markflow.git
cd markflow
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── layout/       # Layout components (Sidebar, DashboardLayout)
│   ├── shared/       # Reusable components (TagInput)
│   └── ui/           # UI primitives (Button, Input, Card, etc.)
├── features/
│   └── editor/       # Editor components (MarkdownEditor, Preview, Toolbar)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── store/            # Zustand store
└── utils/            # Helper utilities (markdown formatting)
```

## Usage

### Creating a Post

1. Click "New Post" in the sidebar or "Create New Post" on the landing page
2. Fill in the title, meta information, and select a post type
3. Add tags by typing and pressing Enter
4. Write your content using markdown in the editor
5. See your content rendered in real-time on the right panel
6. Click "Publish Post" to save

### Editing a Post

1. Go to "All Posts" in the sidebar
2. Click "Edit" on any post card
3. Make your changes
4. Click "Publish Post" to save

### Exporting a Post

Click the "Export JSON" button to download your post as a JSON file.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Customization

MarkFlow is designed to be easily customizable:

- **Styling**: Modify Tailwind classes or update `src/index.css`
- **Components**: All UI components are in `src/components/ui/`
- **Store**: Extend the Zustand store in `src/store/usePostStore.js`
- **Markdown**: Customize toolbar actions in `src/utils/markdown.js`

## Use Cases

- Admin dashboards with content editing
- Blog or CMS platforms
- Documentation editors
- Job posting systems
- Note-taking applications
- Any project needing markdown editing

## License

MIT License - feel free to use this in your own projects.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Made with ❤️ using React and Tailwind CSS by viraj
