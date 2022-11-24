import { FC } from 'react'
import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

import { getLocalSVG } from '@/icons'

export const Wrapper = styled.div<{ panelMinWidth: string }>`
  ${css.flexColumn('align-center')};
  width: 100%;
  min-width: ${({ panelMinWidth }) => panelMinWidth};
  max-height: 300px;
  overflow: hidden;
  padding: 4px 3px;
`
export const Block = styled.div`
  ${css.flex('align-start')};
  width: 100%;
  padding: 4px 10px;
  padding-left: 15px;
  border-radius: 4px;

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`
export const QRWrapper = styled.div`
  opacity: 0.55;
  margin-top: 7px;
  margin-left: 2px;

  &:hover {
    opacity: 1;
  }

  transition: opacity 0.25s;
`
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme('divider')};
  margin-top: 3px;
  margin-bottom: 3px;
`
export const BlockA = styled(Block)`
  text-decoration: none;
`
export const Item = styled.div`
  ${css.flex('align-center')};
`

export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 11px;
  margin-top: 4px;
`
export const LinkIcon = styled(Img)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  margin-left: 7px;
`

export const styledIcon = (comp: FC): FC => {
  return styled(comp)`
    fill: ${theme('article.digest')};
    ${css.size(12)};
    margin-right: 10px;
    opacity: 0.8;

    &:hover {
      fill: ${theme('article.info')};
      opacity: 1;
      cursor: pointer;
    }

    transition: all 0.2s;
  `
}

export const getIcon = (type: string): FC => {
  return getLocalSVG(type, styledIcon)
}
