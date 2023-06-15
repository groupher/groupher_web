import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { Row } from '@/widgets/Common'
import EditSVG from '@/icons/EditPen'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start')};
`
export const LogoWrapper = styled.div`
  ${css.size(30)};
  ${css.flex('align-both')};
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

export const SocialWrapper = styled(Row)`
  margin-top: 24px;
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

  ${BaseInfo}:hover & {
    opacity: 1;
  }
`

const LogoEditIcon = styled(EditIconBase)`
  opacity: 0;

  ${LogoWrapper}:hover & {
    opacity: 1;
  }
`

const SocialEditIcon = styled(EditIconBase)`
  opacity: 0;
  margin-left: 10px;

  ${SocialWrapper}:hover & {
    opacity: 1;
  }
`

export const EditIcon = {
  Logo: LogoEditIcon,
  Title: TitleEditIcon,
  Social: SocialEditIcon,
}
