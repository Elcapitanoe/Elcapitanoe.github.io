export class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleSmoothScroll);
    });
  }

  handleSmoothScroll(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const targetElement = document.querySelector(target.getAttribute('href'));
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}