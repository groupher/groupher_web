import Img from '@/Img'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.rowWrap()};
  color: ${theme('article.digest')};
  width: 100%;
`
type TBlock = { borderRight: boolean; borderTop: boolean }
export const Block = styled.div<TBlock>`
  ${css.column('justify-between')};
  width: 33%;
  height: 230px;
  border: 1px solid;
  border-left: none;
  border-right: ${({ borderRight }) => (borderRight ? '1px solid' : 'none')};
  border-top: ${({ borderTop }) => (borderTop ? '1px solid' : 'none')};
  border-color: #0d4353;
  padding: 15px;
  padding-left: 24px;

  :last-child {
    border-right: none;
  }
  &:hover {
    background: #04313e;
    border-color: #074c61;
  }
  transition: all 0.2s;
`
export const Header = styled.div`
  ${css.column()};
`
export const LinkHead = styled.div`
  ${css.row('align-center', 'justify-between')};
  font-size: 12px;
  margin-bottom: 5px;
`

export const IntroHead = styled.div`
  ${css.row('align-center')};
  &:hover {
    cursor: pointer;
  }
`
export const Icon = styled(Img)`
  ${css.size(20)};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
`
export const Desc = styled.div`
  ${css.lineClamp(2)}
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-top: 15px;
  opacity: 0.9;
  cursor: pointer;

  ${Block}:hover & {
    color: ${theme('article.title')};
    opacity: 1;
  }
  transition: all 0.2s;
`
export const Footer = styled.div`
  ${css.row('align-end', 'justify-between')};
`
export const CommentWrapper = styled.div`
  margin-bottom: 3px;
`
