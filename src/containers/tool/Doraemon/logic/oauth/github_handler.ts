import { Global, toast } from '@/utils/helper'
import { getQueryFromUrl } from '@/utils/route'

import oauthPopup from './oauth_window'
import S from '../../schema'

const githubLoginHandler = (store, sr71$): void => {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
  const info = 'from_github'
  const cb = 'https://groupher.com/oauth'
  const github = 'https://github.com/login/oauth/authorize'
  const url = `${github}?client_id=${clientId}&state=${info}&redirect_uri=${cb}`

  oauthPopup(url)

  Global.addEventListener('message', (e) => {
    if (e.origin === Global.location.origin) {
      if (e.data.from_oauth_window) {
        const code = getQueryFromUrl('code', e.data.from_oauth_window)

        toast('info', '正在同步您的 github 账户信息, 请稍等..')
        sr71$.mutate(S.githubSignin, { code })
        Global.postMessage({ from_parent: true }, Global.location.href)
      }
    }
  })
}

export default githubLoginHandler
