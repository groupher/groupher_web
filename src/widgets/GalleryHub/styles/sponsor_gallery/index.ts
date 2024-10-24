import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div<{ center: boolean }>`
  ${css.rowWrap()};
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  color: ${theme('article.digest')};
  width: 100%;

  ${css.media.mobile`
    padding: 0 30px;
    overflow-x: hidden;
  `};
`
type TBlock = { level: string }
export const Block = styled.div<TBlock>`
  ${css.column('justify-between')};
  width: ${({ level }) => (level === 'gold' ? '20%' : '25%')};
  height: ${({ level }) => (level === 'gold' ? '280px' : '130px')};
  padding: ${({ level }) => (level === 'gold' ? '25px 25px' : '18px 25px')};
  border: 1px solid transparent;
  margin-bottom: ${({ level }) => (level === 'gold' ? '20px' : '10px')};

  :last-child {
    border-right: none;
  }
  &:hover {
    background: #04313e;
    border-color: #074c61;
    border: 1px solid #044c5f;
    cursor: pointer;
    padding-top: 12px;
  }
  transition: all 0.2s;
  transition-delay: 0.2s;

  ${css.media.mobile`
    width: 50%;
    padding: 0;
  `};
`
export const Header = styled.div`
  ${css.column()};
`
export const IntroHead = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  &:hover {
    cursor: pointer;
  }

  ${css.media.mobile`
    ${css.row('align-both')};
    padding-right: 20%;
    margin-top: 45px;
  `};
`
export const Icon = styled.div`
  ${css.size(20)};
  background: #024b59;
  border-radius: 4px;
`
export const Title = styled.div<{ level: string }>`
  color: ${theme('article.title')};
  border-top: 1px solid;
  border-color: ${theme('article.title')};
  font-size: ${({ level }) => (level === 'gold' ? '18px' : '16px')};
  cursor: pointer;
  padding-top: 5px;

  ${Block}:hover & {
    padding-top: 0;
    border-color: transparent;
  }
  transition: all 0.2s;
  transition-delay: 0.2s;
`
export const IntroGoldHolder = styled.div`
  background: #003a47;
  width: 100%;
  height: 100px;
`
export const IntroImg = styled(Img)`
  width: 100%;
  height: 100px;
  object-fit: cover;
  display: block;
`
export const Desc = styled.div<{ level: string }>`
  ${css.lineClamp(2)}
  color: ${theme('article.digest')};
  font-size: ${({ level }) => (level === 'gold' ? '14px' : '13px')};
  cursor: pointer;
  height: 45px;
  margin-top: ${({ level }) => (level === 'gold' ? '3px' : '5px')};

  ${css.media.mobile`
    padding-right: 20px;
    height: auto;
  `};

  ${Block}:hover & {
    color: ${theme('article.title')};
    opacity: 1;
  }
  transition: all 0.3s;
  transition-delay: 0.2s;
`
export const LinkWrapper = styled.div`
  opacity: 0;
  ${Block}:hover & {
    opacity: 1;
  }
  transition: all 0.2s;
  transition-delay: 0.2s;
`
