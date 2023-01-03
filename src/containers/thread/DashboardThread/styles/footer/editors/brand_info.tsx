import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import EditSVG from '@/icons/EditPen'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start')};
`
export const Logo = styled.div`
  ${css.size(30)};
  border-radius: 4px;
  background: ${theme('divider')};
`
export const BaseInfo = styled.div``
export const Title = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-weight: 600;
  font-size: 14px;
  margin-top: 15px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  width: 220px;
  ${css.lineClamp(2)};
  opacity: 0.8;
  font-size: 12px;
  margin-top: 5px;
`

export const EditIcon = styled(EditSVG)<{ onClick: () => void }>`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: 10px;
  opacity: 0;

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  ${BaseInfo}:hover & {
    opacity: 1;
  }

  transition: all 0.2s; ;
`
