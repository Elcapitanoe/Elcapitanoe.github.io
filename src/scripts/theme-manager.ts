export class ThemeManager {
  private isDark: boolean;
  private toggleButton: HTMLButtonElement;
  private themeIcon: HTMLSpanElement;

  constructor() {
    this.toggleButton = document.getElementById('themeToggle') as HTMLButtonElement;
    this.themeIcon = this.toggleButton.querySelector('.theme-icon') as HTMLSpanElement;
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDark = savedTheme === 'dark';
    } else {
      // Check system preference
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    this.init();
  }

  private init(): void {
    this.applyTheme();
    this.toggleButton.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes only if no saved preference
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
    // Apply theme immediately to prevent flash
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    this.themeIcon.textContent = this.isDark ? '☀️' : '🌙';
    
    // Also set a class for additional styling if needed
    document.body.classList.toggle('dark-theme', this.isDark);
    document.body.classList.toggle('light-theme', !this.isDark);
  }
}