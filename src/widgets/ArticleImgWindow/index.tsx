/*
 *
 * ArticleImgWindow
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import { DesktopOnly, MobileOnly } from '@/widgets/Common'
import { Wrapper, Block, MobileBlock } from './styles'

const _log = buildLog('w:ArticleImgWindow:index')

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
