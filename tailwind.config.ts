
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Brand colors
				'subscriptly-dark': 'hsl(var(--subscriptly-dark))',
				'subscriptly-teal': 'hsl(var(--subscriptly-teal))',
				'subscriptly-gray': 'hsl(var(--subscriptly-gray))',
				'subscriptly-light': 'hsl(var(--subscriptly-light))',
				// Warm accent colors
				'warm-amber': 'hsl(var(--warm-amber))',
				'warm-orange': 'hsl(var(--warm-orange))',
				'warm-peach': 'hsl(var(--warm-peach))',
				'warm-gold': 'hsl(var(--warm-gold))',
				'warm-coral': 'hsl(var(--warm-coral))'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-warm': 'linear-gradient(135deg, hsl(var(--warm-amber)) 0%, hsl(var(--warm-gold)) 100%)',
				'gradient-sunset': 'linear-gradient(135deg, hsl(var(--warm-orange)) 0%, hsl(var(--warm-coral)) 100%)',
				'gradient-warm-subtle': 'linear-gradient(135deg, hsl(var(--warm-peach) / 0.1) 0%, hsl(var(--warm-amber) / 0.1) 100%)'
			},
			boxShadow: {
				'premium': 'var(--shadow-premium)',
				'card': 'var(--shadow-card)',
				'glow': 'var(--shadow-glow)',
				'3d': 'var(--shadow-3d)',
				'warm-glow': '0 0 20px hsl(var(--warm-amber) / 0.3)',
				'warm-subtle': '0 2px 8px hsl(var(--warm-amber) / 0.1)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'swift': 'var(--transition-swift)',
			},
			fontFamily: {
				'sans': ['Inter', 'SF Pro Display', 'Avenir', 'system-ui', 'sans-serif'],
				'montserrat': ['Montserrat', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'warm-glow': {
					'0%, 100%': { boxShadow: '0 0 0 0 hsl(var(--warm-amber) / 0.4)' },
					'50%': { boxShadow: '0 0 16px 4px hsl(var(--warm-amber) / 0.6)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'warm-glow': 'warm-glow 1.5s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
