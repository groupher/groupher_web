import styled from 'styled-components'

import type { TTestable, TActive } from '@/spec'
import css, { theme } from '@/utils/css'
import { LineDivider } from '@/widgets/Common'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  position: relative;
  height: 100%;
`
export const Title = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};
  font-weight: bold;
  margin-bottom: 16px;
  margin-left: 2px;
`
export const SettingWrapper = styled.div<TActive>`
  ${css.flex()};
  display: ${({ show }) => (show ? 'flex' : 'none')};
  margin-left: 3px;
`
export const SwitchWrapper = styled.div`
  ${css.flex('align-center', 'justify-between')};
  padding-right: 10px;
`
export const ToggleTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-left: 1px;
  margin-top: 2px;
`
export const Divider = styled(LineDivider)`
  height: 80px;
  margin-left: 30px;
  margin-right: 45px;
  margin-top: 45px;
`
export const GeneralSettings = styled.div`
  width: 45%;
`
export const AngleSettings = styled.div`
  margin-top: -1px;
`
