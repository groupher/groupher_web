import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'
import Img from '~/Img'

export const Wrapper = styled.div<TActive>`
  ${css.row('align-center')};
  margin-left: 5px;
  max-height: ${({ $show }) => ($show ? 'auto' : 0)};
  overflow: hidden;
  transition: all 0.2s;
`
export const Brief = styled.div`
  margin-bottom: 10px;
  margin-left: 12px;
`
export const Logo = styled(Img)`
  ${css.size(32)};
  margin-top: -6px;
`
export const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${theme('article.title')};
`
export const InfoBar = styled.div`
  ${css.row('align-center')};
  margin-top: 2px;
`
export const Label = styled.div`
  font-size: 13px;
  color: ${theme('hint')};
`
export const Count = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  font-weight: 500;
  margin-left: 5px;
`
