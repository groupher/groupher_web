import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.column('align-center')};
`
export const BlockWrapper = styled.div`
  ${css.rowWrap('justify-start')};
  color: ${theme('article.digest')};
  width: 100%;
  min-height: 500px;
`
export const Block = styled.div`
  ${css.column()};
  width: 200px;
  max-width: 200px;
  height: 60px;
  border: none;
  padding: 10px;
  border-radius: 2px;
  border: 1px solid transparent;

  :last-child {
    border-right: none;
  }
  &:hover {
    background: #04313e;
    border-color: #074c61;
    border: 1px solid #044c5f;
    cursor: pointer;
    padding-top: 8px;
  }
  transition: all 0.1s;
  transition-delay: 0.1s;
`
export const Header = styled.div`
  ${css.column()};
`
export const IntroHead = styled.div`
  ${css.row('align-center')};
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`
export const HolderIcon = styled.div`
  ${css.size(16)};
  margin-right: 10px;
  background: #003b49;
`
export const Icon = styled(Img)`
  ${css.circle(16)};
  margin-right: 10px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-bottom: 2px;
  cursor: pointer;
  padding-top: 3px;

  ${Block}:hover & {
    padding-top: 0;
    border-color: transparent;
  }
  transition: all 0.1s;
  transition-delay: 0.1s;
`
export const LinkWrapper = styled.div`
  opacity: 0;
  width: 100%;
  ${Block}:hover & {
    opacity: 1;
  }
  transition: all 0.1s;
  transition-delay: 0.1s;
`

export const ExchangeButton = styled.a`
  margin-top: 30px;
  margin-bottom: 50px;
  font-size: 16px;

  color: ${theme('button.primary')};
  text-decoration: none;

  &:hover {
    color: ${theme('button.primary')};
    text-decoration: none;
    cursor: pointer;
  }
`
