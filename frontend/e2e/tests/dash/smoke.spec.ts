import { expect, test } from '@playwright/test'

test('tanstack dashboard overview renders', async ({ page }) => {
  await page.goto('/home/overview')
  await expect(page).toHaveURL(/\/home\/overview/)
  await expect(page.getByTestId('dashboard-overview-title')).toBeVisible()
})

test('dark wallpaper editor selects the dark SSR draft before hydration', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() === 'script') await route.abort()
    else await route.continue()
  })

  const response = await page.goto('/home/appearance/wallpaper', {
    waitUntil: 'domcontentloaded',
  })
  const ssrHtml = await response?.text()
  const prePaintIndex = ssrHtml?.indexOf("document.documentElement.setAttribute('data-theme'") ?? -1
  const headEndIndex = ssrHtml?.indexOf('</head>') ?? -1
  const bodyIndex = ssrHtml?.indexOf('<body') ?? -1

  expect(prePaintIndex).toBeGreaterThan(-1)
  expect(headEndIndex).toBeGreaterThan(prePaintIndex)
  expect(bodyIndex).toBeGreaterThan(headEndIndex)

  const preview = page.locator('[data-wallpaper-editor-preview]')
  const light = preview.locator('[data-wallpaper-editor-theme="light"]')
  const dark = preview.locator('[data-wallpaper-editor-theme="dark"]')

  await expect(preview).toBeAttached()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(light).toHaveCSS('opacity', '0')
  await expect(dark).toHaveCSS('opacity', '1')
  await expect(dark).not.toHaveCSS('background-image', 'none')
})
