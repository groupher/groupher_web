/*
 *
 * ArticleImgWindow
 *
 */

import { type FC, memo } from 'react'

import { DesktopOnly, MobileOnly } from '@/widgets/Common'
import { Wrapper, Block, MobileBlock } from './styles'

type TProps = {
  testid?: string
}

const ArticleImgWindow: FC<TProps> = ({ testid = 'article-img-window' }) => {
  return (
    <Wrapper $testid={testid}>
      <DesktopOnly flex>
        <Block />
        <Block />
      </DesktopOnly>

      <MobileOnly>
        <MobileBlock />
      </MobileOnly>
    </Wrapper>
  )
}

export default memo(ArticleImgWindow)
