import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import {
  AUTH_ERROR,
  GROUPHER_AUTH_CSRF_HEADER,
  GROUPHER_AUTH_CSRF_VALUE,
  GROUPHER_AUTH_SIGNED_IN_COOKIE,
} from '@groupher/contracts/auth'
import { API_ROUTE } from '@groupher/route-contract'
import { print, type DocumentNode } from 'graphql'
import { ClientError, GraphQLClient } from 'graphql-request'

import { invalidateAuthState, requestLogin, resolveAuthFailure, withAuthRetry } from '~/auth'

const ACCOUNT_LOGIN_ERROR_CODE = 4301

type TGraphQLError = {
  message?: unknown
  extensions?: { code?: unknown }
}

const formatGraphQLErrorMessage = (message: unknown): string => {
  if (typeof message === 'string') return message
  if (Array.isArray(message)) {
    return message
      .map((item) => {
        if (!item || typeof item !== 'object') return String(item)
        const entry = item as { key?: unknown; message?: unknown }
        const detail =
          typeof entry.message === 'string' ? entry.message : String(entry.message ?? '')
        return entry.key ? `${String(entry.key)}: ${detail}` : detail
      })
      .filter(Boolean)
      .join('\n')
  }
  if (message && typeof message === 'object') return JSON.stringify(message)
  return message == null ? '' : String(message)
}

export class GraphQLRequestError extends Error {
  readonly errors: TGraphQLError[]
  readonly response: Response

  constructor(response: Response, errors: TGraphQLError[]) {
    super(
      errors
        .map((error) => formatGraphQLErrorMessage(error.message))
        .filter(Boolean)
        .join('\n') || 'GraphQL request failed.',
    )
    this.name = 'GraphQLRequestError'
    this.errors = errors
    this.response = response
  }
}

const hasSignedInHint = (): boolean =>
  typeof document !== 'undefined' &&
  document.cookie.split(';').some((item) => item.trim() === `${GROUPHER_AUTH_SIGNED_IN_COOKIE}=1`)

const normalizeAuthCode = (code: unknown): string | undefined => {
  if (typeof code === 'string') return code
  if (code === ACCOUNT_LOGIN_ERROR_CODE && hasSignedInHint()) return AUTH_ERROR.TOKEN_MISSING
  return undefined
}

class GraphQLAuthResponseError extends Error {
  readonly failure: { code?: string; status?: number }
  readonly response: Response

  constructor(response: Response, failure: { code?: string; status?: number }) {
    super('GraphQL authentication requires refresh.')
    this.name = 'GraphQLAuthResponseError'
    this.failure = failure
    this.response = response
  }
}

/**
 * Browser-side fetch options shared by TanStack Query and imperative GraphQL
 * calls. Browser code always talks to the same-origin `/api/graphql` facade;
 * cookies are still included so the Next route handler can read the Groupher
 * auth token cookie and forward only that cookie to Phoenix.
 *
 */
export const GRAPHQL_FETCH_OPTIONS = (): RequestInit => ({
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    [GROUPHER_AUTH_CSRF_HEADER]: GROUPHER_AUTH_CSRF_VALUE,
  },
})

const responseAuthFailure = async (
  response: Response,
): Promise<{ code?: string; status?: number }> => {
  try {
    const payload = (await response.clone().json()) as {
      data?: { sessionState?: { isValid?: unknown } }
      errors?: Array<{ extensions?: { code?: unknown } }>
    }
    const rawCode = payload.errors
      ?.map((error) => error.extensions?.code)
      .find((value) => value !== undefined)
    const code = normalizeAuthCode(rawCode)
    // `sessionState` is the explicit authenticated probe. The public nullable
    // `me` field must never be used as a refresh signal.
    if (!code && payload.data?.sessionState?.isValid === false && hasSignedInHint()) {
      return { code: AUTH_ERROR.TOKEN_MISSING, status: response.status }
    }
    return { code, status: response.status }
  } catch {
    return { status: response.status }
  }
}

/** Browser GraphQL transport with one demand-driven refresh and one replay. */
export const createAuthFetch =
  (fetcher: typeof fetch = fetch): typeof fetch =>
  async (input, init) => {
    const replayInput = input instanceof Request ? input.clone() : input
    let attempt = 0

    try {
      return await withAuthRetry(
        async () => {
          const response = await fetcher(attempt++ === 0 ? input : replayInput, init)
          const failure = await responseAuthFailure(response)
          const action = resolveAuthFailure(failure)
          if (action === 'refresh') {
            throw new GraphQLAuthResponseError(response, failure)
          }
          if (action === 'login') {
            invalidateAuthState()
            requestLogin()
          }
          return response
        },
        (error) => (error instanceof GraphQLAuthResponseError ? error.failure : {}),
      )
    } catch (error) {
      if (error instanceof GraphQLAuthResponseError) return error.response
      throw error
    }
  }

export type TBrowserGraphQLRequestOptions = {
  fetcher?: typeof fetch
  signal?: AbortSignal
}

const browserGraphQLEndpoint = (): string =>
  typeof window === 'undefined'
    ? API_ROUTE.GRAPHQL
    : new URL(API_ROUTE.GRAPHQL, window.location.origin).toString()

/** Typed same-origin GraphQL transport shared by TanStack Query and mutations. */
export const browserGraphQLRequest = async <
  TResult,
  TVariables extends object = Record<string, unknown>,
>(
  document: string | DocumentNode | TypedDocumentNode<TResult, TVariables>,
  variables: TVariables = {} as TVariables,
  options: TBrowserGraphQLRequestOptions = {},
): Promise<TResult> => {
  let response: Response | undefined
  const fetcher = createAuthFetch(options.fetcher || fetch)
  const observedFetch: typeof fetch = async (input, init) => {
    response = await fetcher(input, options.signal ? { ...init, signal: options.signal } : init)
    return response
  }
  const fetchOptions = GRAPHQL_FETCH_OPTIONS()
  const client = new GraphQLClient(browserGraphQLEndpoint(), {
    credentials: fetchOptions.credentials,
    headers: fetchOptions.headers,
    cache: 'no-store',
    fetch: observedFetch,
  })

  try {
    const result = await client.rawRequest<TResult, TVariables>(
      typeof document === 'string' ? document : print(document),
      variables,
    )
    return result.data
  } catch (error) {
    if (!(error instanceof ClientError)) throw error

    const errors = (error.response.errors || []).map((item) => ({
      message: item.message,
      extensions: { code: item.extensions?.code },
    }))
    const errorResponse =
      response ||
      new Response(error.response.body, {
        status: error.response.status,
        headers: error.response.headers,
      })

    throw new GraphQLRequestError(errorResponse, errors)
  }
}
