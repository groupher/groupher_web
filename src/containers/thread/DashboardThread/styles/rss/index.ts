import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  padding: 0 100px;
  padding-right: 120px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
`
export const InnerWrapper = styled.div`
  ${css.flexColumn()};
  margin-top: 50px;
`
export const SettingsRow = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 40px;
`
export const NumRow = styled.div`
  ${css.flex('align-end')};
`
export const SettingTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  width: 100px;
`
