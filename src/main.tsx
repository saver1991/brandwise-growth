
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add the scrollToTop function to fix the issue with pages not scrolling to top on navigation
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Create a DOM element to render the app
createRoot(document.getElementById("root")!).render(<App />);
