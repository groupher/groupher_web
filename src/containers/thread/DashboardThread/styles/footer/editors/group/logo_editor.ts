import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import InfoSVG from '@/icons/Info'

import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  ${css.flex('align-start')};
  gap: 0 40px;
`
export const LeftWrapper = styled.div`
  ${css.flexColumn('align-start')};
  max-width: 150px;
  gap: 18px;
`
export const LogoWrapper = styled.div`
  ${css.size(40)};
  background: ${theme('divider')};
`

export const UnitTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
`
export const InputWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 10px;
  margin-top: -10px;
`

export const Inputer = styled(Input)`
  width: 50px;
  height: 25px;
  background: transparent;

  ::placeholder {
    font-size: 12px;
  }
`

export const RightWrapper = styled.div`
  ${css.flexColumn('align-start')};
  color: ${theme('article.digest')};
  flex-grow: 1;
  width: 180px;
  height: auto;
  gap: 18px;
  margin-right: -50px;

  ul {
    list-style: disc;
    font-size: 12px;
    margin-left: 20px;
    margin-top: -5px;
    opacity: 0.8;
  }
  li {
    margin-bottom: 8px;
    padding-left: 2px;
  }
`

export const Note = styled.div`
  ${css.flex('align-center')};
  font-size: 13px;
  color: ${theme('article.digest')};
  font-weight: 600;
  margin-left: 2px;
`

export const InfoIcon = styled(InfoSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 7px;
`
