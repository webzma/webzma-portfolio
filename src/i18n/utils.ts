import { ui, defaultLang } from './ui'

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/')
	if (lang in ui) return lang as keyof typeof ui
	return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key]
	}
}

export function getRouteFromUrl(url: URL): string | undefined {
	const pathname = new URL(url).pathname
	const parts = pathname?.split('/')
	const path = parts.pop() || parts.pop()

	if (path === undefined) {
		return undefined
	}

	const currentLang = getLangFromUrl(url)

	if (defaultLang === currentLang) {
		const route = path ? path : undefined
		return route
	}

	const getKeyFromValue = (obj: Record<string, string>, value: string): string | undefined => {
		return Object.keys(obj).find((key) => obj[key] === value)
	}

	const reversedKey = getKeyFromValue(ui[currentLang], path)

	if (reversedKey !== undefined) {
		return reversedKey.split('.')[1]
	}

	return undefined
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		return l === defaultLang ? path : `/${l}${path}`
	}
}
