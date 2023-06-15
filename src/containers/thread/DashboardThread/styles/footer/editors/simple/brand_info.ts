import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import EditSVG from '@/icons/EditPen'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
`
export const LogoWrapper = styled.div`
  ${css.size(25)};
  ${css.flex('align-both')};
  border-radius: 4px;
  background: ${theme('divider')};
`
export const Title = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-weight: 600;
  font-size: 14px;
  margin-left: 10px;
`

const EditIconBase = styled(EditSVG)<{ onClick?: () => void }>`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  opacity: 1;

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s; ;
`

const TitleEditIcon = styled(EditIconBase)`
  opacity: 0;
  margin-left: 10px;

  ${Wrapper}:hover & {
    opacity: 1;
  }
`

const LogoEditIcon = styled(EditIconBase)`
  opacity: 0;

  ${LogoWrapper}:hover & {
    opacity: 1;
  }
`

export const EditIcon = {
  Logo: LogoEditIcon,
  Title: TitleEditIcon,
}
