import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column()};
`
export const SettingWrapper = styled.div`
  ${css.row('align-center')};
  margin-left: 30px;
  margin-top: 5px;
`
export const SettingIcon = styled(Img)`
  ${css.size(16)};
  fill: ${theme('button.primary')};
  margin-left: 5px;
`
