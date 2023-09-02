import styled from 'styled-components'

import css from '@/css'

import { DesktopHoverable, DesktopDigest } from '../..'

export const Wrapper = styled(DesktopHoverable)`
  padding: 10px 0;
  margin-bottom: 2px;
`
export const Main = styled.div`
  ${css.columnGrow()};
`
export const UpvoteWrapper = styled.div`
  width: 40px;
  margin-right: 18px;
  margin-top: 7px;
`
export const Digest = styled(DesktopDigest)`
  ${css.cutRest('510px')};
  margin-top: 4px;
  margin-bottom: 8px;
`
