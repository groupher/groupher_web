import styled, { css, theme } from '~/css'

import { Title } from './filter_panel'

export const Wrapper = styled.div`
  color: ${theme('article.title')};
  transform: scale(0.92);
  margin-right: 3px;
`
export const TagItem = styled.div`
  ${css.row('align-center')};
  background: ${theme('hoverActive')};
  height: 26px;
  box-shadow: ${theme('button.boxShadow')};
  padding: 5px 6px;
  padding-right: 8px;
  border-radius: 6px;
`
export const TagTitle = styled(Title)`
  color: ${theme('article.title')};
  font-size: 13px;
`
