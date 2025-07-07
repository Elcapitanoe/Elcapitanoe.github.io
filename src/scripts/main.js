import { ThemeManager } from './theme-manager.js';
import { SmoothScroll } from './smooth-scroll.js';
import { ZoomPrevention } from './zoom-prevention.js';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new SmoothScroll();
  new ZoomPrevention();
});