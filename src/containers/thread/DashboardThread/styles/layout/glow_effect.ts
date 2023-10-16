import styled from 'styled-components'

import type { TActive, TGlowEffect, TPrimaryColor } from '@/spec'
import GLOW_EFFECTS from '@/constant/glow_effect'

import css, { theme, rainbow } from '@/css'

import DLightSVG from '@/icons/DLight'
import ClossSVG from '@/icons/CloseLight'

import { BaseSection } from '.'

export const Wrapper = styled(BaseSection)``

export const Row = styled.div`
  ${css.rowWrap('align-center')};
  gap: 26px 20px;

  width: calc(100% + 40px);

  ${css.media.mobile`
    width: 100%;
  `}
`
type TBox = TActive & TPrimaryColor
export const Box = styled.div<TBox>`
  position: relative;
  width: 300px;
  height: 180px;
  border-radius: 6px;
  border: 1px solid;
  z-index: 1;

  border-color: ${({ $active, primaryColor }) =>
    $active ? rainbow(primaryColor) : theme('divider')};

  box-shadow: ${({ $active }) => ($active ? css.cardShadow : 'none')};
  background: ${theme('alphaBg')};

  &:hover {
    box-shadow: ${css.cardShadow};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const NoBox = styled(Box)`
  ${css.column('align-both')};
`
export const ForbidIcon = styled(DLightSVG)`
  ${css.size(40)};
  fill: ${theme('article.digest')};
  opacity: 0.6;
`
export const CloseIcon = styled(ClossSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};
  transform: scaley(0.9);
  opacity: 0.3;
`

export const SettingTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  width: 80px;
`
export const SettingsRow = styled.div`
  ${css.row('align-center')};
  margin-left: 4px;
`

export const GrowBackground = styled.div<TGlowEffect>`
  background: ${({ glowType }) => `
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].LEFT.X} ${GLOW_EFFECTS[glowType].LEFT.Y}, ${GLOW_EFFECTS[glowType].LEFT.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].LEFT.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].RIGHT1.X} ${GLOW_EFFECTS[glowType].RIGHT1.Y}, ${GLOW_EFFECTS[glowType].RIGHT1.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].RIGHT1.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].MAIN.X} ${GLOW_EFFECTS[glowType].MAIN.Y}, ${GLOW_EFFECTS[glowType].MAIN.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].MAIN.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].RIGHT2.X} ${GLOW_EFFECTS[glowType].RIGHT2.Y}, ${GLOW_EFFECTS[glowType].RIGHT2.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].RIGHT1.RADIUS});
  `};

  filter: saturate(1.2);
  inset: 0;
  position: ${({ glowPosition }) => glowPosition};
  z-index: -1;
`
