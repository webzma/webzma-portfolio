import { readFile } from 'node:fs/promises'

import type { APIRoute } from 'astro'
import satori from 'satori'
import sharp from 'sharp'

import { getAllPosts } from '@/utils'
import { defaultLang, projects, ui } from '@/i18n/ui'

export const prerender = true

/*
	Per-page social cards, rendered at build time: the home's changelog voice
	at 1200×630. Satori turns the text into outlines, so sharp needs no system
	fonts and the card comes out the same on any build machine.

	Satori cannot read OKLCH, so these are the literal sRGB expansion of the
	dark tokens in app.css — if those move, these move with them. (Same
	trade-off the theme-color meta tags make.)
*/
const COLOR = {
	ground: '#101712', // --ok-paper-2
	rule: '#323b34', // --ok-rule-2
	muted: '#8a9a8a', // --ok-muted
	ink2: '#ced8c9', // --ok-ink-2
	ink: '#eff4eb', // --ok-ink
	accent: '#f4c352', // --ok-accent-ink
	add: '#86d489' // --ok-add
}

const WIDTH = 1200
const HEIGHT = 630
const PADDING = 72

type Lang = keyof typeof ui

type Card =
	| { kind: 'home'; lang: Lang }
	| { kind: 'page'; command: string; title: string; description: string; detail?: string }

/* Satori takes the shape of a React element, not JSX, in a plain .ts route. */
type Child = object | string | false | undefined
const el = (type: string, style: object, ...children: Child[]) => ({
	type,
	props: { style, children: children.filter(Boolean) }
})
const row = (style: object, ...children: Child[]) =>
	el('div', { display: 'flex', ...style }, ...children)
const column = (style: object, ...children: Child[]) =>
	row({ flexDirection: 'column', ...style }, ...children)

const fonts = [
	{ weight: 400, file: 'martian-mono-latin-400-normal.woff' },
	{ weight: 700, file: 'martian-mono-latin-700-normal.woff' }
]
const loadedFonts = await Promise.all(
	fonts.map(async ({ weight, file }) => ({
		name: 'Martian Mono',
		weight: weight as 400 | 700,
		style: 'normal' as const,
		data: await readFile(`./src/assets/og-fonts/${file}`)
	}))
)

const portrait = await readFile('./src/assets/og-portrait.jpeg')
const portraitSrc = `data:image/jpeg;base64,${portrait.toString('base64')}`

const prompt = (command: string) =>
	row(
		{ fontSize: 26, color: COLOR.muted, gap: 16 },
		el('span', { color: COLOR.accent, fontWeight: 700 }, '$'),
		el(
			'span',
			{
				maxWidth: WIDTH - PADDING * 2 - 48,
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis'
			},
			command
		)
	)

/* The same small amber square the nav's wordmark carries. */
const mark = (size: number) =>
	el('div', { width: size, height: size, background: COLOR.accent, flexShrink: 0 })

const footer = (left: Child, right: Child) =>
	row(
		{
			justifyContent: 'space-between',
			alignItems: 'center',
			gap: 32,
			paddingTop: 28,
			borderTop: `2px dashed ${COLOR.rule}`,
			fontSize: 24
		},
		left,
		right
	)

const site = new URL(import.meta.env.SITE).host

function homeCard(lang: Lang) {
	const t = ui[lang]
	const [first, ...rest] = t['hero.name'].split(' ')
	const live = projects[lang].filter((project) => project.status === 'live').length

	return column(
		{ flex: 1, justifyContent: 'space-between' },
		row(
			{ justifyContent: 'space-between', gap: 48 },
			column(
				{ flex: 1 },
				prompt('whoami'),
				column(
					{
						marginTop: 28,
						fontSize: 100,
						fontWeight: 700,
						lineHeight: 1.04,
						letterSpacing: '-0.05em',
						color: COLOR.ink
					},
					el('span', {}, first),
					el('span', {}, rest.join(' '))
				),
				el('div', { marginTop: 24, fontSize: 34, color: COLOR.accent }, t['hero.role']),
				el('div', { marginTop: 14, fontSize: 25, color: COLOR.ink2 }, t['og.stack'])
			),
			{
				type: 'img',
				props: {
					src: portraitSrc,
					width: 340,
					height: 340,
					style: { borderRadius: '50%', flexShrink: 0 }
				}
			}
		),
		footer(
			row(
				{ alignItems: 'center', gap: 16, color: COLOR.accent },
				el('div', { width: 16, height: 16, borderRadius: 16, background: COLOR.accent }),
				t['hero.status']
			),
			row(
				{ gap: 14, color: COLOR.ink2 },
				el('span', { color: COLOR.add, fontWeight: 700 }, '+'),
				`${live} ${t['og.shipped']}`
			)
		)
	)
}

function pageCard({ command, title, description, detail }: Extract<Card, { kind: 'page' }>) {
	return column(
		{ flex: 1, justifyContent: 'space-between' },
		column(
			{},
			prompt(command),
			el(
				'div',
				{
					marginTop: 36,
					fontSize: title.length > 34 ? 54 : 76,
					fontWeight: 700,
					lineHeight: 1.1,
					letterSpacing: '-0.045em',
					color: COLOR.ink,
					display: 'block',
					lineClamp: 3
				},
				title
			),
			el(
				'div',
				{
					marginTop: 28,
					fontSize: 28,
					lineHeight: 1.5,
					color: COLOR.ink2,
					display: 'block',
					lineClamp: 3
				},
				description
			)
		),
		footer(
			row({ alignItems: 'center', gap: 16, color: COLOR.ink, fontWeight: 700 }, mark(16), 'webzma'),
			el('span', { color: COLOR.muted, fontSize: 22 }, detail ?? site)
		)
	)
}

/* Keys are the URL under /og-image/, so they mirror the page they belong to
   and a card can never drift onto the wrong project. */
const pages: Record<string, Card> = {
	index: { kind: 'home', lang: 'es' },
	'en-index': { kind: 'home', lang: 'en' }
}

for (const lang of ['es', 'en'] as const) {
	const folder = ui[lang]['work.title'].toLowerCase()
	for (const project of projects[lang]) {
		if (!project.study) continue
		const key = lang === defaultLang ? `work/${project.slug}` : `${lang}/work/${project.slug}`
		pages[key] = {
			kind: 'page',
			command: `cat ./${folder}/${project.slug}`,
			title: project.name,
			description: project.description,
			detail: project.host
		}
	}
}

/* BlogPost.astro already points at /og-image/<slug>.png, so post keys stay
   un-prefixed. */
for (const post of await getAllPosts()) {
	pages[post.slug] = {
		kind: 'page',
		command: `cat ./blog/${post.slug}`,
		title: post.data.title,
		description: post.data.description
	}
}

export const getStaticPaths = () =>
	Object.keys(pages).map((key) => ({ params: { route: `${key}.png` } }))

export const GET: APIRoute = async ({ params }) => {
	const card = pages[params.route!.replace(/\.png$/, '')]
	if (!card) return new Response('Not found', { status: 404 })

	const body = card.kind === 'home' ? homeCard(card.lang) : pageCard(card)
	const svg = await satori(
		column(
			{
				boxSizing: 'border-box',
				width: WIDTH,
				height: HEIGHT,
				padding: `${PADDING - 8}px ${PADDING}px 52px`,
				background: COLOR.ground,
				fontFamily: 'Martian Mono'
			},
			body
		) as Parameters<typeof satori>[0],
		{ width: WIDTH, height: HEIGHT, fonts: loadedFonts }
	)

	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } })
}
