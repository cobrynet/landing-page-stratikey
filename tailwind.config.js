module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'artboard': '1728px',
    },
    extend: {
      colors: {
        // Stratikey brand colors
        brand: {
          deep: '#390035',     // Background principale
          accent: '#901d6b',   // Accenti
          soft: '#cd8fbe',     // Placeholder
          light: '#f8f4ff',    // Testi chiari
        },
        // Shadcn colors mantengono retrocompatibilità
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontSize: {
        // Font responsive utilizzando clamp
        'xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', '1.2'],
        'sm': ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', '1.3'],
        'base': ['clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', '1.5'],
        'lg': ['clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', '1.6'],
        'xl': ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', '1.7'],
        '2xl': ['clamp(1.5rem, 1.3rem + 1vw, 2rem)', '1.8'],
        '3xl': ['clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)', '1.9'],
        '4xl': ['clamp(2.25rem, 2rem + 1.25vw, 3rem)', '2'],
      },
      spacing: {
        // Spaziatura responsive
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rotate-ellipses": "rotate-ellipses 15s linear infinite",
        "rotate-ellipses-slow": "rotate-ellipses-slow 25s linear infinite",
        "rotate-ellipses-fast": "rotate-ellipses-fast 10s linear infinite",
      },
    },
    container: { 
      center: true, 
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      }, 
      screens: { 
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
        'artboard': '1728px'
      } 
    },
  },
  plugins: [],
  darkMode: ["class"],
};
