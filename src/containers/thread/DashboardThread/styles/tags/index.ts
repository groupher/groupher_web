import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Button from '@/widgets/Buttons/Button'
import AdderSVG from '@/icons/Plus'

export const Wrapper = styled.div`
  padding: 0 100px;
  padding-right: 120px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
`
export const InnerWrapper = styled.div`
  ${css.flexColumn()};
`
export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
`

export const AddButton = styled(Button)`
  height: 32px;
  width: 112px;
  border-color: ${theme('divider')};
`

export const AddIcon = styled(AdderSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 8px;
  margin-left: -20px;

  ${AddButton}:hover & {
    fill: ${theme('article.title')};
  }
`
