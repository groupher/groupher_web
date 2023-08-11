import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export {
  Wrapper,
  LeftWrapper,
  BrandLogo,
  BrandText,
  LinkItem,
  RightWrapper,
  AccountIcon,
} from './center'

export const CenterWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 14px;
  border-radius: 18px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding: 5px 20px;
  padding-right: 5px;
  background: ${theme('alphaBg')};
  margin-top: -2px;
  margin-left: -50px;
`