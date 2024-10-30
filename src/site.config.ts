import type { SiteConfig } from '@/types'
import type { AstroExpressiveCodeOptions } from 'astro-expressive-code'

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: 'webzma',
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: 'astro-theme-resume',
	// Meta property used as the default description meta property
	description: 'The official Astro Resume Theme',
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: 'es_ES',
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: 'en_ES',
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: 'en-GB',
		options: {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		}
	},

	info: {
		profile: {
			avatar: '/avatar.jpg',
			name: 'Wilberk Alejandro Ledezma',
			username: 'webzma',
			description:
				'Desarrollador Frontend Junior con 1 año de experiencia en desarrollo web. Habilidad comprobada en la construcción de aplicaciones web escalables utilizando ReactJS, Next.js y Astro. Constante aprendizaje y búsqueda de nuevas soluciones para mejorar la experiencia del usuario en entornos reales.',
			location: 'Venezuela',
			socials: {
				linkedin: 'https://www.linkedin.com/in/wilberk-ledezma-201378207/',
				github: 'https://github.com/webzma/'
			}
		},
		skills: {
			languages: ['JavaScript', 'TypeScript'],
			frontend: [
				'HTML',
				'CSS',
				'JavaScript',
				'React',
				'TailwindCSS',
				'NextJS',
				'Astro',
				'Shadcn',
				'Alpine.js'
			],
			backend: ['Node.js', 'Express', 'MySQL', 'Postgres'],
			others: ['Git', 'GitHub', 'GitLab', 'Jira', 'Figma']
		}
	}
}

export const menuLinks: Array<{ title: string; path: string }> = [
	{
		title: 'Home',
		path: '/'
	},
	{
		title: 'Blog',
		path: '/blog/'
	}
]

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ['dracula', 'github-light'],
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`
		}
		// return default selector
		return `[data-theme="${theme.name}"]`
	},
	useThemedScrollbars: false,
	styleOverrides: {
		frames: {
			frameBoxShadowCssValue: 'none'
		},
		uiLineHeight: 'inherit',
		codeFontSize: '0.875rem',
		codeLineHeight: '1.7142857rem',
		borderRadius: '4px',
		codePaddingInline: '1rem',
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;'
	}
}
