import { THEME_COOKIE_MAX_AGE, THEME_MODE, THEME_MODE_COOKIE } from '~/const/theme'
import { THEME_COOKIE_CONFIG } from '~/lib/theme'
import type { TThemeMode, TThemeName } from '~/spec'

export type TThemeSeed = {
  theme: TThemeName
  themeMode: TThemeMode
}

export const PUBLIC_THEME_SEED: TThemeSeed = {
  theme: THEME_MODE.LIGHT,
  themeMode: THEME_MODE.SYSTEM,
}

const withTryCatch = (script: string): string => `
(function() {
  try {
${script}
  } catch (e) {}
})();
`

const serializeForInlineScript = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, '\\u003c')

/** Builds the browser script that resolves the theme before the first paint. */
export const prePaintThemeDetectScript = (seed: TThemeSeed = PUBLIC_THEME_SEED) =>
  withTryCatch(`    var cookieConfig = ${serializeForInlineScript(THEME_COOKIE_CONFIG)};
    var mode = '${seed.themeMode}';
    var theme = '${seed.theme}';
    var cookieParts = document.cookie ? document.cookie.split(';') : [];
    var readCookie = function(name) {
      for (var i = 0; i < cookieParts.length; i += 1) {
        var pair = cookieParts[i].trim().split('=');
        if (pair.shift() === name) return decodeURIComponent(pair.join('='));
      }
    };
    var storedMode = readCookie('${THEME_MODE_COOKIE}');

    if (storedMode === '${THEME_MODE.LIGHT}' || storedMode === '${THEME_MODE.DARK}' || storedMode === '${THEME_MODE.SYSTEM}') {
      mode = storedMode;
    }

    if (mode === '${THEME_MODE.SYSTEM}') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? '${THEME_MODE.DARK}' : '${THEME_MODE.LIGHT}';
    } else {
      theme = mode;
    }

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme-mode', mode);
    document.documentElement.style.colorScheme = theme;

    var host = window.location.hostname;
    var domain = cookieConfig.configuredDomain;
    var domainRoot = domain ? domain.slice(1) : '';
    var isConfiguredDomain = domain && (host === domainRoot || host.endsWith(domain));
    if (!isConfiguredDomain) domain = '';
    if (!domain) {
      for (var i = 0; i < cookieConfig.defaultRules.length; i += 1) {
        var rule = cookieConfig.defaultRules[i];
        if (host === rule.host || host.endsWith('.' + rule.host)) {
          domain = rule.domain;
          break;
        }
      }
    }
    if (!domain && cookieConfig.warnOnUnknownHost && window.console) {
      window.console.warn('[theme] No shared cookie domain configured for "' + host + '". Theme preference will remain host-only.');
    }
    var domainAttribute = domain ? '; Domain=' + domain : '';
    var secureAttribute = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = '${THEME_MODE_COOKIE}=' + mode + '; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax' + domainAttribute + secureAttribute;
  `)

/** Seeds browser runtime globals required by shared code before hydration. */
export const prePaintRuntimeSeedScript = (renderedAt: number) =>
  withTryCatch(`    window.process = window.process || { env: {} };
    window.__GROUPHER_INITIAL_NOW__ = ${renderedAt};
`)
