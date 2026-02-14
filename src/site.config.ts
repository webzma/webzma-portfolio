import type { SiteConfig } from '@/types'
import type { AstroExpressiveCodeOptions } from 'astro-expressive-code'

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: 'webzma',
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: 'Wilberk Ledezma - Frontend Developer',
	// Meta property used as the default description meta property
	description:
		'Desarrollador Full Stack especializado en React, Next.js y Astro. Creador de experiencias web modernas, escalables y optimizadas con enfoque en rendimiento y experiencia de usuario.',
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
				'Desarrollador Frontend con sólida experiencia en la construcción de aplicaciones web modernas y escalables. Especializado en React, Next.js y Astro, con un enfoque en crear interfaces intuitivas y de alto rendimiento. Apasionado por las mejores prácticas de desarrollo, la optimización web y la entrega de experiencias de usuario excepcionales. Comprometido con el aprendizaje continuo y la implementación de soluciones innovadoras que generen impacto real.',
			location: 'Venezuela',
			socials: {
				linkedin: 'https://www.linkedin.com/in/wilberk-ledezma-201378207/',
				github: 'https://github.com/webzma/'
			}
		},
		skills: {
			languages: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL'],
			frontend: [
				'HTML',
				'CSS',
				'SCSS',
				'JavaScript',
				'TypeScript',
				'React',
				'Next.js',
				'Astro',
				'TailwindCSS',
				'Shadcn/ui',
				'Alpine.js',
				'Vite',
				'Redux',
				'React Query',
				'Vitest',
				'Jest'
			],
			backend: [
				'Node.js',
				'Express',
				'NestJS',
				'FastAPI',
				'MySQL',
				'PostgreSQL',
				'MongoDB',
				'Redis',
				'Prisma',
				'Docker',
				'Payload CMS'
			],
			others: [
				'Git',
				'GitHub',
				'GitLab',
				'Vercel',
				'Netlify',
				'AWS',
				'Cloudflare',
				'Jira',
				'Slack',
				'Figma',
				'VS Code',
				'Postman',
				'Chrome DevTools',
				'ESLint',
				'Prettier'
			]
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
	themes: ['github-dark', 'github-light'],
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
		codeFontSize: '0.975rem',
		codeLineHeight: '1.7142857rem',
		borderRadius: '4px',
		codePaddingInline: '1rem',
		codeFontFamily: 'Cascadia Code PL'
	}
}
