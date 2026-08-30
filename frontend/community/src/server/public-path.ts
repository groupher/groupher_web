import { isPlatformHost } from '@groupher/route-contract'

/** Returns whether the hostname belongs to a Groupher platform domain rather than a custom community domain. */
export { isPlatformHost }

const normalizeSuffix = (suffix: string): string => {
  if (!suffix || suffix === '/') return ''
  return suffix.startsWith('/') ? suffix : `/${suffix}`
}

/** Accepts proxy community context only when the rewritten path carries the same slug. */
export const isCommunityPathContextTrusted = (pathname: string, slug: string): boolean =>
  Boolean(slug) && pathname.split('/')[1] === slug

/** Returns a browser-visible community path, removing the internal slug on custom domains. */
export const communityPublicPath = (
  community: string,
  suffix = '',
  customDomainOrMatches: boolean | readonly unknown[] = false,
): string => {
  const normalizedSuffix = normalizeSuffix(suffix)
  const customDomain =
    typeof customDomainOrMatches === 'boolean'
      ? customDomainOrMatches
      : customDomainOrMatches.some(
          (match) =>
            (match as { loaderData?: { requestContext?: { customDomain?: boolean } } }).loaderData
              ?.requestContext?.customDomain === true,
        )
  const browserCustomDomain =
    typeof window !== 'undefined' && !isPlatformHost(window.location.hostname)

  return customDomain || browserCustomDomain
    ? normalizedSuffix || '/'
    : `/${community}${normalizedSuffix}`
}
