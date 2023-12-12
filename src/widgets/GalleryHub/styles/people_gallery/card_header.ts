import Img from '@/Img'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  font-size: 12px;
  margin-bottom: 15px;
`
export const NationsWrapper = styled.div`
  ${css.row('align-center')};
  margin-left: 5px;

  transition: all 0.2s;
`
export const NationFlag = styled(Img)`
  width: 16px;
  display: block;
  border-radius: 3px;
  margin-right: 8px;
  filter: saturate(0.5);
`
export const NationName = styled.div`
  font-size: 12px;
  fill: ${theme('article.digest')};
`
export const MoreIcon = styled(Img)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
`
export const MenuItem = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
  color: ${theme('article.digest')};

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
