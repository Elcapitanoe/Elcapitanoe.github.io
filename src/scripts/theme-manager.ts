export class ThemeManager {
  private isDark: boolean;
  private toggleButton: HTMLButtonElement;
  private themeIcon: HTMLSpanElement;

  constructor() {
    this.toggleButton = document.getElementById('themeToggle') as HTMLButtonElement;
    this.themeIcon = this.toggleButton.querySelector('.theme-icon') as HTMLSpanElement;
    
    // Check for saved theme preference or default to light mode
    this.isDark = localStorage.getItem('theme') === 'dark';
    
    this.init();
  }

  private init(): void {
    this.applyTheme();
    this.toggleButton.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.isDark = e.matches;
        this.applyTheme();
      }
    });
  }

  private toggleTheme(): void {
    this.isDark = !this.isDark;
    this.applyTheme();
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    this.themeIcon.textContent = this.isDark ? '☀️' : '🌙';
  }
}