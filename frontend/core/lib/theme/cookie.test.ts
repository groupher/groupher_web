import { DEFAULT_THEME_COOKIE_DOMAIN_RULES, getThemeCookieDomain } from './cookie'

describe('theme cookie domain', () => {
  it.each(DEFAULT_THEME_COOKIE_DOMAIN_RULES)(
    'uses the default domain for $host',
    ({ host, domain }) => {
      expect(getThemeCookieDomain(host)).toBe(domain)
      expect(getThemeCookieDomain(`dash.${host}`)).toBe(domain)
    },
  )

  it('prefers a configured domain when the host belongs to it', () => {
    expect(getThemeCookieDomain('preview.example.com', '.example.com')).toBe('.example.com')
  })

  it('does not apply a configured domain to an unrelated host', () => {
    expect(getThemeCookieDomain('preview.example.net', '.example.com')).toBe('')
  })

  it('keeps unknown hosts host-only', () => {
    expect(getThemeCookieDomain('localhost')).toBe('')
  })

  it.each(['.localhost', '.app.localhost', '127.0.0.1', '[::1]'])(
    'rejects non-shareable configured domain %s',
    (domain) => {
      expect(getThemeCookieDomain(domain.replace(/^\./, ''), domain)).toBe('')
    },
  )
})
