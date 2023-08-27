import styled from 'styled-components'

import css, { theme } from '@/css'

import FormInput from '@/widgets/Input'
import ApplySVG from '@/icons/Apply'

import { InputBar } from './input_box'

export const Wrapper = styled.div`
  position: relative;
  ${css.flexColumn('align-both')};
  color: ${theme('article.digest')};
  background-image: ${theme('banner.linearGradient')};
  width: 100%;
  min-height: 330px;
  padding-bottom: 20px;
`
export const IntroTitle = styled.div`
  position: relative;
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-size: 18px;
  margin-bottom: 20px;
`
export const InfoWrapper = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 38px;
`
export const InputsWrapper = styled.div`
  margin-left: 15px;
`
export const InputBox = styled(InputBar)`
  width: 300px;
  min-width: 300px;
  font-size: 14px;
  text-align: left;
  padding: 6px 18px;
  border-radius: 8px;
  height: 38px;
  flex-grow: 0;

  ::placeholder {
    font-size: 13px;
  }
`

export const ExtraInputBox = styled(FormInput)`
  width: 300px;
  background: transparent;
  min-width: 300px;
  font-size: 14px;
  text-align: left;
  padding: 6px 18px;
  border-radius: 8px;

  ::placeholder {
    font-size: 14px;
  }
`

export const ApplyIcon = styled(ApplySVG)`
  fill: ${theme('article.title')};
  ${css.size(18)};
  margin-right: 10px;
`
export const Title = styled.div`
  color: ${theme('banner.title')};
  font-size: 1.1rem;
`
export const NextBtn = styled.div`
  ${css.flex('align-center', 'justify-center')};
  width: 200px;
  margin-left: 16px;
  filter: grayscale(1);
`
