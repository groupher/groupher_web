import { FC } from 'react'

import useViewingArticle from '@/hooks/useViewingArticle'

import { Wrapper, Inputer, Note, Preview, Slug } from '../styles/sub_menu/slug_setting'

const SlugSetting: FC = () => {
  const { articleLink } = useViewingArticle()

  return (
    <Wrapper>
      <Inputer autoFocus />
      <Note>链接预览: </Note>
      <Preview>
        {articleLink}
        <Slug>/whats-new</Slug>
      </Preview>
    </Wrapper>
  )
}

export default SlugSetting
