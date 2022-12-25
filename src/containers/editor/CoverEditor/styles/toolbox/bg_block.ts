import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ArchSVG from '@/icons/Arch'

import { SettingBlock, SettingTitle } from '.'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.flexColumn('align-both')};
`

export const Block = styled(SettingBlock)``

export const BgImage = styled.div`
  ${css.size(23)};
  border-radius: 5px;
  background-image: linear-gradient(to bottom, #9fbdd3, #ebe6e2);
`

export const Icon = styled(ArchSVG)`
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
