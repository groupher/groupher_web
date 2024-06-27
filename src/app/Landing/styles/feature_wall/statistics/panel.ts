import { WithPosition } from '~/widgets/Common'

import styled, { theme } from '~/css'

export const Wrapper = styled.div`
  padding: 15px;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`
export const SummeryCard = styled(WithPosition)`
  width: 150px;
  height: 110px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
  border-top-left-radius: 8px;
  border-top-right-radius: 10px;
  box-shadow: rgb(194 193 177 / 20%) 0px -3px 24px;
  background: ${theme('htmlBg')};
  z-index: 2;
`
