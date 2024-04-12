import type { NextAuthConfig } from 'next-auth'
import { cookies, headers } from 'next/headers'

import Github from 'next-auth/providers/github'
// import Google from 'next-auth/providers/google'

export default {
  providers: [Github],
  // 配置回调函数
  callbacks: {
    async signIn({ user, account, profile }) {
      // finally get cookies and headers
      // https://github.com/nextauthjs/next-auth/discussions/4428#discussioncomment-7255005
      const cookiesRes = cookies()
      const headersRes = headers()

      cookies().set({
        name: 'groupher.token',
        value: 'bla bla',
        httpOnly: true,
        path: '/',
      })

      // 这里删除没有用，在前端删除？
      // cookies().delete('authjs.session-token')
      cookies().set('authjs.session-token', 'bbb')

      console.log('## ### ### ## ## ## ##')
      console.log('## signIn callback user: ', user)
      console.log('## signIn account: ', account)
      console.log('## signIn profile: ', profile)

      // console.log('## cookiesRes: ', cookiesRes)
      // console.log('## headersRes: ', headersRes)
      console.log('## ### ### ## ## ## ##')
      // 当用户使用任何提供者登录时都会触发此回调
      // 可以根据 account.provider 来确认使用的哪个第三方提供者
      // 调用你的后端服务生成 JWT token
      // const jwtToken = await yourBackendGenerateJwtToken(user, account.provider)
      // 将 JWT token 存储到 user 对象中供后续使用
      // user.jwtToken = jwtToken
      // 返回 true 允许用户登录，返回 false 则拒绝登录
      return true
    },
    // ...其他回调
  },
} satisfies NextAuthConfig
