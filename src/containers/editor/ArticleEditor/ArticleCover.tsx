import { FC, useState, lazy, Suspense } from 'react'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { Wrapper, Adder, AddIcon, AddTitle, ImageIcon } from './styles/article_cover'

const CoverEditor = lazy(() => import('@/containers/editor/CoverEditor'))

const ArticleCover: FC = () => {
  const [hasCover, setHasCover] = useState(true)

  return (
    <Wrapper>
      {!hasCover && (
        <Adder onClick={() => setHasCover(true)}>
          <AddIcon />
          <AddTitle>添加封面图</AddTitle>
          <ImageIcon />
        </Adder>
      )}
      {hasCover && (
        <Suspense fallback={<LavaLampLoading />}>
          <CoverEditor onDelete={() => setHasCover(false)} />
        </Suspense>
      )}
    </Wrapper>
  )
}

export default ArticleCover
