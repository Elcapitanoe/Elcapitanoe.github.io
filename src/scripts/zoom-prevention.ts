export class ZoomPrevention {
  private lastTouchEnd: number = 0;

  constructor() {
    this.init();
  }

  private init(): void {
    // Prevent double-tap zoom on mobile
    document.addEventListener('touchend', this.preventDoubleTapZoom.bind(this), { passive: false });
    
    // Prevent pinch zoom
    document.addEventListener('touchstart', this.preventPinchZoom.bind(this), { passive: false });
    document.addEventListener('touchmove', this.preventPinchZoom.bind(this), { passive: false });
    
    // Prevent keyboard zoom shortcuts
    document.addEventListener('keydown', this.preventKeyboardZoom.bind(this), { passive: false });
    
    // Prevent mouse wheel zoom with Ctrl
    document.addEventListener('wheel', this.preventWheelZoom.bind(this), { passive: false });
    
    // Prevent context menu on long press (mobile)
    document.addEventListener('contextmenu', this.preventContextMenu.bind(this), { passive: false });
  }

  private preventDoubleTapZoom(event: TouchEvent): void {
    const now = new Date().getTime();
    if (now - this.lastTouchEnd <= 300) {
      event.preventDefault();
    }
    this.lastTouchEnd = now;
  }

  private preventPinchZoom(event: TouchEvent): void {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }

  private preventKeyboardZoom(event: KeyboardEvent): void {
    // Prevent Ctrl + Plus/Minus/0 zoom shortcuts
    if (event.ctrlKey && (
      event.key === '+' || 
      event.key === '-' || 
      event.key === '=' || 
      event.key === '0'
    )) {
      event.preventDefault();
    }
    
    // Prevent Cmd + Plus/Minus/0 on Mac
    if (event.metaKey && (
      event.key === '+' || 
      event.key === '-' || 
      event.key === '=' || 
      event.key === '0'
    )) {
      event.preventDefault();
    }
  }

  private preventWheelZoom(event: WheelEvent): void {
    // Prevent Ctrl + Mouse Wheel zoom
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
    }
  }

  private preventContextMenu(event: Event): void {
    // Prevent right-click context menu on mobile long press
    if ('ontouchstart' in window) {
      event.preventDefault();
    }
  }
}