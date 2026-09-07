type TThemeCookieDomainRule = {
  host: string
  domain: string
}

export const DEFAULT_THEME_COOKIE_DOMAIN_RULES: readonly TThemeCookieDomainRule[] = [
  { host: 'groupher.localhost', domain: '.groupher.localhost' },
  { host: 'groupher.com', domain: '.groupher.com' },
]

const normalizeThemeCookieDomain = (domain: string | undefined): string => {
  const value = domain?.trim().toLowerCase() ?? ''
  if (!value) return ''

  const root = value.startsWith('.') ? value.slice(1) : value
  const isIpv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(root)
  const isIpv6 = root.includes(':')
  if (root === 'localhost' || root.endsWith('.localhost') || isIpv4 || isIpv6) return ''
  const isValid = root.split('.').every((label) => /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label))
  return isValid ? `.${root}` : ''
}

const isHostOnDomain = (hostname: string, domain: string): boolean => {
  // The pre-paint inline script duplicates this matching logic because it cannot import Core code.
  // Keep its hostname checks in sync if the subdomain semantics change.
  const root = domain.startsWith('.') ? domain.slice(1) : domain
  return hostname === root || hostname.endsWith(domain)
}

const configuredDomain = normalizeThemeCookieDomain(import.meta.env.VITE_THEME_COOKIE_DOMAIN)

export const THEME_COOKIE_CONFIG = {
  configuredDomain,
  defaultRules: DEFAULT_THEME_COOKIE_DOMAIN_RULES,
  warnOnUnknownHost: import.meta.env.DEV && import.meta.env.MODE !== 'test',
}

const warnedHosts = new Set<string>()

/** Resolves the shared theme cookie domain for a browser hostname. */
export const getThemeCookieDomain = (
  hostname: string,
  explicitDomain = THEME_COOKIE_CONFIG.configuredDomain,
): string => {
  const configured = normalizeThemeCookieDomain(explicitDomain)
  if (configured && isHostOnDomain(hostname, configured)) return configured

  const rule = DEFAULT_THEME_COOKIE_DOMAIN_RULES.find(({ domain }) => {
    return isHostOnDomain(hostname, domain)
  })

  return rule?.domain ?? ''
}

/** Reports an unknown host that cannot share the theme cookie across Groupher hosts. */
export const warnForUnknownThemeCookieHost = (hostname: string, domain: string): void => {
  if (!THEME_COOKIE_CONFIG.warnOnUnknownHost || domain || warnedHosts.has(hostname)) return

  warnedHosts.add(hostname)

  console.warn(
    `[theme] No shared cookie domain configured for "${hostname}". Theme preference will remain host-only.`,
  )
}
