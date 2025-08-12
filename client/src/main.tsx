import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Email obfuscation
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-email]').forEach(el => {
    const email = el.getAttribute('data-email');
    const domain = el.getAttribute('data-domain');
    if (email && domain) {
      const link = document.createElement('a');
      link.href = `mailto:${email}@${domain}`;
      link.textContent = `${email}@${domain}`;
      el.parentNode?.replaceChild(link, el);
    }
  });
});
