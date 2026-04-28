# Litz Up - Adult Marketing Case Studies

A modern React + TypeScript application for showcasing adult marketing case studies with interactive components and responsive design.

## Features

- ⚡ Built with Vite for fast development
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🧩 Reusable UI components
- 📊 Charts and data visualization
- ♿ Accessibility-focused
- 🔧 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jkehr74-cmyk/litz-up.git
cd litz-up
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Vite settings
5. Click Deploy

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click Deploy

### GitHub Pages

1. Update `vite.config.ts` base path if needed
2. Push to GitHub
3. Enable GitHub Pages in repository settings
4. Select `gh-pages` branch

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── sections/      # Page sections
├── hooks/         # Custom React hooks
├── App.tsx        # Main App component
├── main.tsx       # Entry point
├── index.css      # Global styles
└── App.css        # App styles
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Recharts** - Data visualization
- **Lucide React** - Icons

## License

MIT
