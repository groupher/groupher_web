import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import ImageSizeSVG from '@/icons/ImageSize'

import { SettingBlock, SettingTitle } from '.'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.flexColumn('align-both')};
`
export const Block = styled(SettingBlock)``

export const Icon = styled(ImageSizeSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};

  ${Block}:hover & {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
`

export const Desc = styled(SettingTitle)`
  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
