export class ZoomPrevention {
  constructor() {
    this.lastTouchEnd = 0;
    this.init();
  }

  init() {
    // Prevent double-tap zoom on mobile while maintaining accessibility
    document.addEventListener('touchend', this.preventDoubleTapZoom.bind(this), { passive: false });
    
    // Prevent keyboard zoom shortcuts (but allow browser's built-in accessibility zoom)
    document.addEventListener('keydown', this.preventKeyboardZoom.bind(this), { passive: false });
    
    // Prevent context menu on long press (mobile) for better UX
    document.addEventListener('contextmenu', this.preventContextMenu.bind(this), { passive: false });
  }

  preventDoubleTapZoom(event) {
    const now = new Date().getTime();
    if (now - this.lastTouchEnd <= 300) {
      event.preventDefault();
    }
    this.lastTouchEnd = now;
  }

  preventKeyboardZoom(event) {
    // Only prevent zoom shortcuts that might interfere with the design
    // Allow browser's accessibility zoom features to work
    if (event.ctrlKey && (
      event.key === '+' || 
      event.key === '-' || 
      event.key === '=' || 
      event.key === '0'
    )) {
      // Only prevent if not using accessibility features
      if (!event.altKey && !event.shiftKey) {
        event.preventDefault();
      }
    }
    
    // Prevent Cmd + Plus/Minus/0 on Mac (same accessibility consideration)
    if (event.metaKey && (
      event.key === '+' || 
      event.key === '-' || 
      event.key === '=' || 
      event.key === '0'
    )) {
      if (!event.altKey && !event.shiftKey) {
        event.preventDefault();
      }
    }
  }

  preventContextMenu(event) {
    // Only prevent context menu on touch devices for better UX
    if ('ontouchstart' in window) {
      event.preventDefault();
    }
  }
}