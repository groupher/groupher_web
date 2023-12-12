// import Img from '@/Img'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div<{ revert: boolean }>`
  ${css.column()};
  align-items: ${({ revert }) => (revert ? 'flex-start' : 'flex-end')};
  color: ${theme('article.digest')};
  font-size: 14px;
  padding: 4px;
  padding-top: 0;
`
type TagsWrapper = { revert?: boolean }
export const TagsWrapper = styled.div<TagsWrapper>`
  ${css.column()};
  align-items: ${({ revert }) => (revert ? 'flex-start' : 'flex-end')};
  margin-top: 5px;
`

export const Item = styled.div<{ revert: boolean }>`
  ${css.row('align-center')};
  justify-content: ${({ revert }) => (revert ? 'flex-start' : 'flex-end')};
  width: 100%;
`
