import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: ['dark'],
	corePlugins: {
		aspectRatio: false
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Hallmark tokens (src/styles/app.css) are the source of truth. The
			// legacy shadcn names below are aliases onto them so the blog, tools
			// and 404 routes keep rendering without a rewrite.
			colors: {
				paper: 'oklch(var(--ok-paper) / <alpha-value>)',
				'paper-2': 'oklch(var(--ok-paper-2) / <alpha-value>)',
				rule: 'oklch(var(--ok-rule) / <alpha-value>)',
				'rule-2': 'oklch(var(--ok-rule-2) / <alpha-value>)',
				ink: 'oklch(var(--ok-ink) / <alpha-value>)',
				'ink-2': 'oklch(var(--ok-ink-2) / <alpha-value>)',
				'accent-ink': 'oklch(var(--ok-accent-ink) / <alpha-value>)',
				'accent-fg': 'oklch(var(--ok-accent-fg) / <alpha-value>)',
				focus: 'oklch(var(--ok-focus) / <alpha-value>)',
				band: 'oklch(var(--ok-band) / <alpha-value>)',
				'band-2': 'oklch(var(--ok-band-2) / <alpha-value>)',
				'band-rule': 'oklch(var(--ok-band-rule) / <alpha-value>)',
				'band-ink': 'oklch(var(--ok-band-ink) / <alpha-value>)',
				'band-muted': 'oklch(var(--ok-band-muted) / <alpha-value>)',
				'band-accent': 'oklch(var(--ok-band-accent) / <alpha-value>)',

				border: 'oklch(var(--ok-rule) / <alpha-value>)',
				input: 'oklch(var(--ok-rule) / <alpha-value>)',
				ring: 'oklch(var(--ok-focus) / <alpha-value>)',
				background: 'oklch(var(--ok-paper) / <alpha-value>)',
				foreground: 'oklch(var(--ok-ink) / <alpha-value>)',
				primary: {
					DEFAULT: 'oklch(var(--ok-ink) / <alpha-value>)',
					foreground: 'oklch(var(--ok-paper-2) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'oklch(var(--ok-paper-2) / <alpha-value>)',
					foreground: 'oklch(var(--ok-ink) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'oklch(var(--ok-destructive) / <alpha-value>)',
					foreground: 'oklch(var(--ok-paper) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'oklch(var(--ok-paper-2) / <alpha-value>)',
					foreground: 'oklch(var(--ok-muted) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'oklch(var(--ok-accent) / <alpha-value>)',
					foreground: 'oklch(var(--ok-paper) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'oklch(var(--ok-paper) / <alpha-value>)',
					foreground: 'oklch(var(--ok-ink) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'oklch(var(--ok-paper-2) / <alpha-value>)',
					foreground: 'oklch(var(--ok-ink) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius-lg)',
				md: 'var(--radius)',
				sm: 'var(--radius)'
			},
			fontFamily: {
				// Cobalt's 3 families. `satoshi` stays as an alias onto the body
				// face so the blog / tools / 404 routes keep rendering unchanged.
				sans: ['Inter', ...fontFamily.sans],
				body: ['Inter', ...fontFamily.sans],
				satoshi: ['Inter', ...fontFamily.sans],
				display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', ...fontFamily.mono]
			}
		}
	}
}

export default config
