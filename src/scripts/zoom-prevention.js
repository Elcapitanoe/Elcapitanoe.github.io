export class ZoomPrevention {
  constructor() {
    this.lastTouchEnd = 0;
    this.init();
  }

  init() {
    
    document.addEventListener('touchend', this.preventDoubleTapZoom.bind(this), { passive: false });

    document.addEventListener('keydown', this.preventKeyboardZoom.bind(this), { passive: false });

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

    if (event.ctrlKey && (
      event.key === '+' || 
      event.key === '-' || 
      event.key === '=' || 
      event.key === '0'
    )) {
      
      if (!event.altKey && !event.shiftKey) {
        event.preventDefault();
      }
    }

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
    
    if ('ontouchstart' in window) {
      event.preventDefault();
    }
  }
}