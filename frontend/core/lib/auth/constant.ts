export const AUTH_CHANNEL = 'groupher-auth'

export const AUTH_EVENT = {
  LOGIN: 'auth:login',
  LOGOUT: 'auth:logout',
  INVALID: 'auth:invalid',
  REFRESHED: 'auth:refreshed',
} as const

export const AUTH_DOM_EVENT = {
  LOGIN_REQUEST: 'groupher-auth:login-request',
  LOGOUT: 'groupher-auth:logout',
} as const

export type TAuthEvent = (typeof AUTH_EVENT)[keyof typeof AUTH_EVENT]
