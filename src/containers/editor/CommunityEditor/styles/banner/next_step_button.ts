import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import Button from '@/widgets/Buttons/Button'

export const Wrapper = styled.div`
  padding: 2px 10px;
`

export const NextButton = styled(Button)`
  padding-right: 8px;
  padding-left: 24px;
`

export const IntroTitle = styled.div`
  position: relative;
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-size: 18px;
  margin-bottom: 20px;
  margin-left: -10px;
`

export const Text = styled.div<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? theme('article.title') : 'white')};
`
