export type SiteConfig = {
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	date: {
		locale: string | string[] | undefined
		options: Intl.DateTimeFormatOptions
	}
	info: {
		profile: {
			avatar: string
			name: string
			username: string
			description: string
			location: string
			socials: {}
		}
		skills: {
			languages: string[]
			frontend: string[]
			backend: string[]
			others: string[]
		}
	}
}

export type PaginationLink = {
	url: string
	text?: string
	srLabel?: string
}

export type SiteMeta = {
	title: string
	description?: string
	ogImage?: string | undefined
	articleDate?: string | undefined
}
