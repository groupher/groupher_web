import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { InputBar } from './input_box'

import Img from '@/Img'
import ApplySVG from '@/icons/Apply'
import UploadSVG from '@/icons/Upload'

export const Wrapper = styled.div`
  position: relative;
  ${css.flexColumn('align-both')};
  color: ${theme('article.digest')};
  background-image: ${theme('banner.linearGradient')};
  width: 100%;
  height: 300px;
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
export const RealCover = styled(Img)`
  ${css.size(80)};
  border-radius: 6px;
`
export const HolderWrapper = styled.div`
  ${css.size(80)};
  border-radius: 6px;
  background: ${theme('hoverBg')};
`
export const HolderInner = styled.div`
  width: 100%;
  height: 100%;
  ${css.flexColumn('align-both')};
  opacity: 0.6;

  ${HolderWrapper}:hover & {
    opacity: 0;
  }
  transition: all 0.2s;
`
export const HolderIcon = styled(UploadSVG)`
  ${css.size(28)};
  fill: ${theme('lightText')};
  margin-bottom: 4px;
  margin-top: 3px;
`
export const HolderText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${theme('lightText')};
  font-style: italic;
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
  position: absolute;
  ${css.flex('align-center', 'justify-center')};
  width: 200px;
  bottom: 20px;
  margin-left: 16px;
  filter: grayscale(1);
`
