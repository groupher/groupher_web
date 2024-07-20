import type { FC } from 'react'

import type { TPost } from '~/spec'

import { previewArticle } from '~/signal'

import Header from './Header'
import Footer from './Footer'

import useSalon from '../styles/quora_layout'

type TProps = {
  article: TPost
}

const PostItem: FC<TProps> = ({ article }) => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <Header article={article} />
      <div className={s.digest} onClick={() => previewArticle(article)}>
        {article.digest}
      </div>
      <Footer article={article} />
    </div>
  )
}

export default PostItem
