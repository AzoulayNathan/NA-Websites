/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      colors: {
        sand: 'hsl(var(--sand))',
        quartz: 'hsl(var(--quartz))',
        parchment: 'hsl(var(--parchment))',
        olive: 'hsl(var(--olive))',
        'deep-green': 'hsl(var(--deep-green))',
        terracotta: 'hsl(var(--terracotta))',
        'sky-blue': 'hsl(var(--sky-blue))',
        'water-blue': 'hsl(var(--water-blue))',
        copper: 'hsl(var(--copper))',
        'technical-blue': 'hsl(var(--technical-blue))',
        ink: 'hsl(var(--ink))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'seam-draw': {
          from: { scaleY: 0, opacity: 0 },
          to: { scaleY: 1, opacity: 1 },
        },
        'light-sweep': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { opacity: 0.6 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
        'underline-draw': {
          from: { scaleX: 0 },
          to: { scaleX: 1 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'seam-draw': 'seam-draw 1.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'light-sweep': 'light-sweep 2s cubic-bezier(0.22,1,0.36,1) forwards',
        'underline-draw': 'underline-draw 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
