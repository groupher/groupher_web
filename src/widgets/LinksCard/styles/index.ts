import type { TSpace } from '~/spec'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div<TSpace>`
  width: 280px;
  min-height: 180px;
  border-radius: 5px;
  padding: 10px;
  margin-left: ${({ left }) => `${left}px`};
  margin-right: ${({ right }) => `${right}px`};
  margin-bottom: ${({ bottom }) => `${bottom}px`};
  /* border-bottom: 1px solid #0f4556; */
`
export const Header = styled.div``

export const Title = styled.span`
  color: ${theme('article.title')};
  font-size: 14px;
  font-weight: bold;
  /* padding-bottom: 5px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('article.digest')}; */
`
export const ListWrapper = styled.div`
  ${css.column()};
  margin-top: 15px;
`
export const MoreWrapper = styled.div`
  opacity: 0.5;
  margin-top: 2px;

  &:hover {
    opacity: 1;
  }

  transition: opacity 0.25s;
`
