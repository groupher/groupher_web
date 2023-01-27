import { FC, useState } from 'react'
import dynamic from 'next/dynamic'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { Wrapper, Adder, AddIcon, AddTitle, ImageIcon } from './styles/article_cover'

const CoverEditor = dynamic(() => import('@/containers/editor/CoverEditor'), {
  /* eslint-disable react/display-name */
  loading: () => <LavaLampLoading />,
  ssr: false,
})

const ArticleCover: FC = () => {
  const [hasCover, setHasCover] = useState(false)

  return (
    <Wrapper>
      {!hasCover && (
        <Adder onClick={() => setHasCover(true)}>
          <AddIcon />
          <AddTitle>添加封面图</AddTitle>
          <ImageIcon />
        </Adder>
      )}
      {hasCover && <CoverEditor />}
    </Wrapper>
  )
}

export default ArticleCover
