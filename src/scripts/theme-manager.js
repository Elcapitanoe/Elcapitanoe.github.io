export class ThemeManager {
  constructor() {
    this.toggleButton = document.getElementById('themeToggle');
    this.themeIcon = this.toggleButton.querySelector('.theme-icon');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDark = savedTheme === 'dark';
    } else {
      
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    this.init();
  }

  init() {
    this.applyTheme();
    this.toggleButton.addEventListener('click', () => this.toggleTheme());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.isDark = e.matches;
        this.applyTheme();
      }
    });
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.applyTheme();
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  applyTheme() {
    
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    this.themeIcon.textContent = this.isDark ? '☀️' : '🌙';

    document.body.classList.toggle('dark-theme', this.isDark);
    document.body.classList.toggle('light-theme', !this.isDark);
  }
}