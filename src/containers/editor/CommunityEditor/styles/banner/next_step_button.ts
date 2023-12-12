import styled, { css, theme } from '@/css'
import Button from '@/widgets/Buttons/Button'

export const Wrapper = styled(Button)<{ noPaddingRight: boolean }>`
  padding-right: ${({ noPaddingRight }) => (noPaddingRight ? '0px' : '6px')};
  padding-left: 24px;
`

export const IntroTitle = styled.div`
  position: relative;
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 18px;
  margin-bottom: 20px;
  margin-left: -10px;
`

export const Text = styled.div<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? theme('article.title') : 'white')};
  transition: all 0.2s;
`
