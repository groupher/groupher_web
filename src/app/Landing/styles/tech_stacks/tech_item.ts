import styled, { css, theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 50px;
  height: 60px;
`
export const A4Paper = styled(Img)`
  width: 26px;
  height: 32px;
  margin-top: 4px;
  filter: drop-shadow(2px 4px 6px #f5f5f5);
`
export const IconWrapper = styled.div`
  ${css.size(45)};
  ${css.row('align-both')};
`
export const TeckIcon = styled(Img)<{ size?: number }>`
  ${({ size }) => css.size(size || 50)};
  border-radius: 5px;
  filter: drop-shadow(2px 4px 6px lightgrey);

  ${css.media.mobile`
    ${css.size(30)};
  `};
`
export const Name = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  z-index: 1;
`
