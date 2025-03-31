
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add the scrollRestoration to ensure pages always scroll to top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Create a DOM element to render the app
createRoot(document.getElementById("root")!).render(<App />);
