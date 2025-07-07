export class SmoothScroll {
  constructor() {
    this.init();
  }

  private init(): void {
    // Add smooth scroll behavior for any future navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleSmoothScroll);
    });
  }

  private handleSmoothScroll(e: Event): void {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement;
    const targetElement = document.querySelector(target.getAttribute('href') as string);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}