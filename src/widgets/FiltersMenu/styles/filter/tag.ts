import type { TActive } from '~/spec'
// import Img from '~/Img'
import styled, { css, theme } from '~/css'

const activeColor = '#009C9E'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-bottom: 8px;
  margin-right: -1px;
  letter-spacing: 1px;
  &:hover {
    cursor: pointer;
  }
`
export const Dot = styled.div<TActive>`
  background: ${activeColor};
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 12px;
  opacity: 0;

  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.25s;
`
export const FoldDot = styled(Dot)`
  background: ${({ active }) => (active ? activeColor : theme('article.digest'))};
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 12px;
  opacity: 1;
  transition: opacity 0.25s;
`

type TTitle = TActive & { revert?: boolean }
export const Title = styled.div<TTitle>`
  font-size: 13px;
  color: ${({ active }) => (active ? activeColor : theme('article.digest'))};
  margin-right: ${({ revert }) => (revert ? '6px' : '0')};
  margin-left: ${({ revert }) => (revert ? '1px' : '0')};

  &:hover {
    color: ${({ active }) => (active ? activeColor : theme('article.title'))};
  }

  transition: all 0.2s;
`
