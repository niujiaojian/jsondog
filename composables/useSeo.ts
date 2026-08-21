interface SeoOptions {
  title: string
  description: string
  path?: string
}

export const useSeo = (opts: SeoOptions) => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl as string) || 'https://jsondog.chatools.cn'
  const url = `${siteUrl}${opts.path || ''}`

  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogUrl: url,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: opts.title,
    twitterDescription: opts.description
  })

  useHead({
    link: [{ rel: 'canonical', href: url }]
  })
}