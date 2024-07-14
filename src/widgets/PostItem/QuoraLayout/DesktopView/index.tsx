import { type FC, memo } from 'react'

import type { TPost } from '~/spec'

import { previewArticle } from '~/signal'

// import ArticlePinLabel from '~/widgets/ArticlePinLabel'

// import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Footer from './Footer'

import useSalon, { Digest } from '../../styles/quora_layout/desktop_view'

type TProps = {
  article: TPost
}

const DesktopView: FC<TProps> = ({ article }) => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <Header article={article} />
      <Digest onClick={() => previewArticle(article)}>{article.digest}</Digest>
      <Footer article={article} />
    </div>
  )
}

export default memo(DesktopView)
