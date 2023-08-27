import styled from 'styled-components'

import css, { theme } from '@/css'

import ManSVG from '@/icons/Man'
import WomanSVG from '@/icons/Woman'

import { SEX } from '../constant'

export const Wrapper = styled.div`
  ${css.flex()};
  width: 250px;
`
const sexIcon = `
  ${css.size(20)};
  margin-right: 6px;
  margin-left: 5px;
  cursor: pointer;
`
export const DudeIcon = styled(ManSVG)<{ value: string }>`
  ${sexIcon};
  fill: ${({ value }) => (value === SEX.DUDE ? theme('baseColor.blue') : theme('article.digest'))};
`
export const GirlIcon = styled(WomanSVG)<{ value: string }>`
  ${sexIcon};
  fill: ${({ value }) => (value === SEX.GIRL ? theme('baseColor.pink') : theme('article.digest'))};
  margin-top: 1px;
`
