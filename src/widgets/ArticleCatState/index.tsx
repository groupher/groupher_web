/*
 *
 * ArticleCatState
 *
 */

import { type FC, memo } from 'react'

import type { TSpace, TArticleCat, TArticleState } from '~/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '~/const/gtd'

import State from './State'
import Label from './Label'

import { Wrapper } from './styles'

export type TProps = {
  testid?: string
  cat?: TArticleCat
  state?: TArticleState
  smaller?: boolean
  noBorder?: boolean
  // size?
} & TSpace

const ArticleCatState: FC<TProps> = ({
  testid = 'article-cat-state',
  cat = ARTICLE_CAT.FEATURE,
  state = ARTICLE_STATE.DEFAULT,
  smaller = true,
  noBorder = false,
  ...restProps
}) => {
  return (
    <Wrapper $testid={testid} $noBorder={noBorder} {...restProps}>
      {cat && <Label cat={cat} smaller={smaller} />}
      {cat && cat !== ARTICLE_CAT.OTHER && <State cat={cat} state={state} smaller={smaller} />}
    </Wrapper>
  )
}

export default memo(ArticleCatState)
