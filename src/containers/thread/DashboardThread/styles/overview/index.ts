import styled from 'styled-components'

import css, { theme } from '@/css'
import Input from '@/widgets/Input'

import { ALIGN_HEADER_OFFSET } from '../../constant'

export const Wrapper = styled.div`
  ${css.column()};
  padding: ${() => `0 ${ALIGN_HEADER_OFFSET}`};
  padding-left: 60px;
`
export const Section = styled.div`
  padding-bottom: 30px;
  margin-bottom: 20px;
`
export const LogoWrapper = styled.div`
  ${css.size(70)};
`
export const Logo = styled.div`
  ${css.size(70)};
  background: ${theme('hoverBg')};
  border-radius: 4px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-bottom: 12px;
`
export const Desc = styled.div`
  color: ${theme('hint')};
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
`
export const Row = styled.div`
  ${css.row('align-center')};
`
export const Label = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const Inputer = styled(Input)`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 300px;
`
