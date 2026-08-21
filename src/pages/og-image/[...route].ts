import { OGImageRoute } from 'astro-og-canvas'

import { getAllPosts } from '@/utils'
import { projects, ui } from '@/i18n/ui'
import { siteConfig } from '@/site-config'

export const prerender = true

/*
	Per-page social cards, rendered at build time.

	The card is the site's closing band: graphite ground, one cobalt edge.
	CanvasKit cannot read OKLCH, so these are the literal sRGB expansion of
	the Cobalt --ok-band-* tokens — if those move, these move with them.
	(Same trade-off the theme-color meta tags already make.)
*/
const BAND: [number, number, number] = [18, 22, 29] // --ok-band  20% 0.016 260
const BAND_2: [number, number, number] = [31, 36, 44] // --ok-band-2  26% 0.016 259
const BAND_MUTED: [number, number, number] = [159, 165, 172] // --ok-band-muted
const BAND_INK: [number, number, number] = [239, 242, 245] // --ok-band-ink
const BAND_ACCENT: [number, number, number] = [90, 168, 255] // --ok-band-accent

interface CardPage {
	title: string
	description: string
}

const posts = await getAllPosts()

/* Keys are the URL under /og-image/, so they mirror the page they belong to
   and a card can never drift onto the wrong project. */
const pages: Record<string, CardPage> = {
	index: { title: ui.es['hero.name'], description: ui.es['hero.intro'] },
	'en-index': { title: ui.en['hero.name'], description: ui.en['hero.intro'] }
}

for (const lang of ['es', 'en'] as const) {
	for (const project of projects[lang]) {
		if (!project.study) continue
		const key = lang === 'es' ? `work/${project.slug}` : `en/work/${project.slug}`
		pages[key] = { title: project.name, description: project.description }
	}
}

/* BlogPost.astro already points at /og-image/<slug>.png, so post keys stay
   un-prefixed. */
for (const post of posts) {
	pages[post.slug] = {
		title: post.data.title,
		description: post.data.description
	}
}

export const { getStaticPaths, GET } = await OGImageRoute({
	/* The param name is read from the route pattern ([...route]) — v0.13
	   dropped the explicit `param` option. */
	pages,
	/* The default slugger assumes keys are source paths and eats a trailing
	   "/index"; ours are already the URL we want, so just add the suffix. */
	getSlug: (path) => `${path}.png`,
	getImageOptions: (_path, page: CardPage) => ({
		title: page.title,
		description: page.description,
		bgGradient: [BAND, BAND_2],
		/* The one cobalt beat, on the leading edge — the same role the hero's
		   tick plays on the page itself. */
		border: { color: BAND_ACCENT, width: 12, side: 'inline-start' as const },
		padding: 72,
		font: {
			title: {
				families: ['Space Grotesk'],
				color: BAND_INK,
				lineHeight: 1.1,
				size: 66
			},
			description: {
				families: ['Inter'],
				color: BAND_MUTED,
				lineHeight: 1.45,
				size: 28
			}
		},
		fonts: ['./src/assets/og-fonts/SpaceGrotesk.ttf', './src/assets/og-fonts/Inter.ttf']
	})
})

export const siteName = siteConfig.title
