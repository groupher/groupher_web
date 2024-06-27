import styled, { css, theme } from '~/css'

import { SelectItem as SelectItemBase } from '.'

export const Wrapper = styled.div`
  ${css.column()};
  width: 200px;
  cursor: auto;
`
export const GroupWrapper = styled.div`
  ${css.rowWrap('align-center')};
  width: 100%;
  margin-bottom: 10px;
`
export const SelectItem = styled(SelectItemBase)`
  ${css.row('align-center')};
  margin-bottom: 4px;
  margin-right: 3px;
`
export const GroupTitle = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.8;
  margin-left: 7px;
  margin-bottom: 5px;
  margin-top: 3px;
`
export const Title = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};

  ${SelectItem}:hover & {
    color: ${theme('article.title')};
  }
`
