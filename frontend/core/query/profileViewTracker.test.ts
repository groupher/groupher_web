import { trackProfileView } from './profileViewTracker'

const { browserGraphQLRequest } = vi.hoisted(() => ({ browserGraphQLRequest: vi.fn() }))
vi.mock('~/graphql/client', () => ({ browserGraphQLRequest }))

describe('trackProfileView', () => {
  beforeEach(() => browserGraphQLRequest.mockReset())
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('does nothing during SSR', async () => {
    vi.stubGlobal('window', undefined)

    await expect(trackProfileView('alice')).resolves.toBeNull()
    expect(browserGraphQLRequest).not.toHaveBeenCalled()
  })

  it('returns the committed Profile counter', async () => {
    browserGraphQLRequest.mockResolvedValue({
      trackProfileView: { tracked: true, views: 12 },
    })

    await expect(trackProfileView('alice')).resolves.toEqual({ tracked: true, views: 12 })
    expect(browserGraphQLRequest).toHaveBeenCalledWith(expect.anything(), { login: 'alice' })
  })

  it('retries the same identity-safe command once on transport failure', async () => {
    browserGraphQLRequest.mockRejectedValueOnce(new TypeError('network')).mockResolvedValueOnce({
      trackProfileView: { tracked: true, views: 12 },
    })

    await trackProfileView('alice')

    expect(browserGraphQLRequest).toHaveBeenCalledTimes(2)
    expect(browserGraphQLRequest.mock.calls[0][1]).toEqual(browserGraphQLRequest.mock.calls[1][1])
  })

  it('does not retry a deterministic request error', async () => {
    const requestError = new Error('forbidden')
    browserGraphQLRequest.mockRejectedValueOnce(requestError)

    await expect(trackProfileView('alice')).rejects.toBe(requestError)
    expect(requestError.message).toBe('forbidden')
    expect(browserGraphQLRequest).toHaveBeenCalledTimes(1)
  })
})
