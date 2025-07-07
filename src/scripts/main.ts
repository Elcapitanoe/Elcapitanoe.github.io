import { ThemeManager } from './theme-manager';
import { SmoothScroll } from './smooth-scroll';
import { ZoomPrevention } from './zoom-prevention';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new SmoothScroll();
  new ZoomPrevention();
});