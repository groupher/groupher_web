import NextAuth from 'next-auth'

import authConfig from '../../../auth.config'

/**
 * see the anwser here:
 * https://github.com/nextauthjs/next-auth/discussions/9251#discussioncomment-8399500
 */
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig)
