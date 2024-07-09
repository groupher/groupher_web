import styled, { css, theme } from '~/css'
import Img from '~/Img'

import { DesktopHoverable, DesktopDigest } from '../..'

export const Wrapper = styled(DesktopHoverable)`
  margin-bottom: 10px;
  padding: 12px 0;
`
export const Main = styled.div`
  ${css.columnGrow()};
`
export const CoverWrapper = styled.div`
  width: 180px;
  height: 100px;
  margin-right: 20px;
  margin-top: 14px;
`
export const CoverImg = styled(Img)`
  width: 180px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`
export const Digest = styled(DesktopDigest)`
  ${css.cutRest('340px')};
  margin-top: 6px;
  margin-bottom: 5px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
