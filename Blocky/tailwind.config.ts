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
					foreground: 'hsl(var(--primary-foreground))'
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
				// Gaming Block Colors - Vibrant Palette
				game: {
					red: 'hsl(var(--game-red))',
					blue: 'hsl(var(--game-blue))',
					green: 'hsl(var(--game-green))',
					yellow: 'hsl(var(--game-yellow))',
					orange: 'hsl(var(--game-orange))',
					purple: 'hsl(var(--game-purple))',
					cyan: 'hsl(var(--game-cyan))',
					pink: 'hsl(var(--game-pink))',
					lime: 'hsl(var(--game-lime))',
					indigo: 'hsl(var(--game-indigo))'
				},
				// Block Gradients for Connected Look
				block: {
					red: 'var(--block-red)',
					blue: 'var(--block-blue)',
					green: 'var(--block-green)',
					yellow: 'var(--block-yellow)',
					orange: 'var(--block-orange)',
					purple: 'var(--block-purple)',
					cyan: 'var(--block-cyan)',
					pink: 'var(--block-pink)',
					lime: 'var(--block-lime)',
					indigo: 'var(--block-indigo)'
				},
				// Game Grid Colors
				grid: {
					bg: 'hsl(var(--grid-bg))',
					border: 'hsl(var(--grid-border))',
					cell: 'hsl(var(--grid-cell))',
					filled: 'hsl(var(--grid-filled))'
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
				}
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
				// Game Animations
				'block-place': {
					'0%': {
						transform: 'scale(1.1)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'line-clear': {
					'0%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.5',
						transform: 'scale(1.05)'
					},
					'100%': {
						opacity: '0',
						transform: 'scale(0.9)'
					}
				},
				'bounce-in': {
					'0%': {
						transform: 'scale(0.3)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.05)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px hsl(var(--accent) / 0.5)'
					},
					'50%': {
						boxShadow: '0 0 20px hsl(var(--accent) / 0.8)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'block-place': 'block-place 0.2s ease-out',
				'line-clear': 'line-clear 0.5s ease-in-out',
				'bounce-in': 'bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
