import { ThemeManager } from './theme-manager.js';
import { SmoothScroll } from './smooth-scroll.js';
import { ZoomPrevention } from './zoom-prevention.js';

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new SmoothScroll();
  new ZoomPrevention();
});