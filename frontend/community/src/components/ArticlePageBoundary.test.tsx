import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { beforeEach, expect, it, vi } from 'vitest'

const recovery = vi.hoisted(() => ({ refresh: vi.fn(), reset: vi.fn(), navigate: vi.fn() }))
vi.mock('../query/articleSurface', () => ({
  refreshArticleBootstrap: recovery.refresh,
  resetArticleSurface: recovery.reset,
}))
vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({ pathname: '/home/post', searchStr: '' }),
  useNavigate: () => recovery.navigate,
}))
vi.mock('~/ui/Buttons/Button', () => ({
  default: ({
    ariaLabel,
    children,
    disabled,
    onClick,
  }: React.PropsWithChildren<{ ariaLabel: string; disabled: boolean; onClick: () => void }>) => (
    <button aria-label={ariaLabel} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
}))

import ArticlePageBoundary from './ArticlePageBoundary'

beforeEach(() => vi.resetAllMocks())

it('hydrates the failure shell, refreshing bootstrap before mounting any list child', async () => {
  const client = new QueryClient()
  let complete: () => void
  recovery.refresh.mockReturnValue(
    new Promise<void>((resolve) => {
      complete = resolve
    }),
  )
  const tree = (
    <QueryClientProvider client={client}>
      <div>Community shell</div>
      <ArticlePageBoundary community='home' surface='posts' recovery='bootstrap'>
        List mounted
      </ArticlePageBoundary>
    </QueryClientProvider>
  )
  expect(renderToString(tree)).toContain('列表加载失败')
  expect(recovery.refresh).not.toHaveBeenCalled()
  render(<StrictMode>{tree}</StrictMode>)
  expect(screen.getByText('Community shell')).toBeTruthy()
  expect(screen.queryByText('List mounted')).toBeNull()
  expect(recovery.refresh).toHaveBeenCalledTimes(1)
  await act(async () => complete())
  expect(screen.getByText('List mounted')).toBeTruthy()
  expect(recovery.reset).toHaveBeenCalledWith(client, 'home', 'posts')
})

it('keeps failed bootstrap recovery retryable without an automatic request loop', async () => {
  recovery.refresh.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(undefined)
  await act(async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ArticlePageBoundary community='home' surface='changelogs' recovery='bootstrap'>
          List mounted
        </ArticlePageBoundary>
      </QueryClientProvider>,
    )
  })
  expect(screen.getByRole('button').hasAttribute('disabled')).toBe(false)
  expect(recovery.refresh).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByRole('button'))
  await screen.findByText('List mounted')
  expect(recovery.refresh).toHaveBeenCalledTimes(2)
})

it('does not auto retry or refresh bootstrap for non-revision failures', () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <ArticlePageBoundary community='home' surface='posts' recovery='list'>
        List mounted
      </ArticlePageBoundary>
    </QueryClientProvider>,
  )
  expect(recovery.refresh).not.toHaveBeenCalled()
  expect(screen.queryByText('List mounted')).toBeNull()
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('List mounted')).toBeTruthy()
  expect(recovery.refresh).not.toHaveBeenCalled()
})

it('does not reset or navigate the abandoned surface when bootstrap resolves after unmount', async () => {
  let complete: () => void
  recovery.refresh.mockReturnValue(
    new Promise<void>((resolve) => {
      complete = resolve
    }),
  )
  const { unmount } = render(
    <QueryClientProvider client={new QueryClient()}>
      <ArticlePageBoundary community='home' surface='posts' recovery='bootstrap'>
        List
      </ArticlePageBoundary>
    </QueryClientProvider>,
  )
  unmount()
  await act(async () => complete())
  expect(recovery.reset).not.toHaveBeenCalled()
  expect(recovery.navigate).not.toHaveBeenCalled()
})
