import { useEffect } from 'react'

const SITE = 'Sumanam Engineering Services'
const ORIGIN = 'https://sumanam.co.in'

function upsertMeta(selector, attr, name, content) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-route document head for a client-rendered SPA.
 *
 * `noindex` exists for the ~555 project pages that carry only a name, client
 * and sector. They are useful to a visitor browsing the sector tables, but as
 * near-identical pages they are exactly the "thin content" pattern search
 * engines discount — and at that volume they can drag on sitewide quality
 * signals. Keeping them out of the index protects the ~42 real case studies.
 */
export function useSeo({ title, description, image, path, noindex = false } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : SITE
    document.title = fullTitle

    if (description) {
      upsertMeta('meta[name="description"]', 'name', 'description', description)
      upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    }

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)

    if (image) {
      const abs = image.startsWith('http') ? image : ORIGIN + image
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', abs)
      upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', abs)
    }

    if (path) {
      const url = ORIGIN + path
      upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
      upsertLink('canonical', url)
    }

    // Robots: only present while a noindex route is mounted, then removed so
    // navigating back to an indexable page does not leave the tag behind.
    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) {
      upsertMeta('meta[name="robots"]', 'name', 'robots', 'noindex, follow')
    } else if (robots) {
      robots.remove()
    }

    return () => {
      const stale = document.head.querySelector('meta[name="robots"]')
      if (stale) stale.remove()
    }
  }, [title, description, image, path, noindex])
}
