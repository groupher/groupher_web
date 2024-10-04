import styled, { css, theme } from '~/css'
import AdderSVG from '~/icons/Plus'

import Button from '~/widgets/Buttons/Button'

export const Wrapper = styled.div`
  ${css.column('justify-center')};
  margin-top: 50px;
`
export const Notes = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-top: 10px;
`
export const AddButton = styled(Button)`
  width: 120px;
  border-color: ${theme('article.digest')};

  transition: all 0.2s;
`
export const AddIcon = styled(AdderSVG)`
  ${css.size(14)};
  margin-right: 5px;
  fill: white;
`
