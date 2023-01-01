import styled from 'styled-components'

import type { TActive, TGlowEffect } from '@/spec'
import { GLOW_EFFECTS } from '@/constant'

import css, { theme } from '@/utils/css'

import { BaseSection } from '.'

export const Wrapper = styled(BaseSection)``

export const Row = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  gap: 20px;
`
export const Box = styled.div<TActive>`
  position: relative;
  width: 310px;
  height: 200px;
  border-radius: 6px;
  border: 1px solid;

  border-color: ${({ $active }) => ($active ? theme('article.digest') : theme('divider'))};
  box-shadow: ${({ $active }) => ($active ? css.cardShadow : 'none')};

  &:hover {
    box-shadow: ${css.cardShadow};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const SettingTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  width: 80px;
`
export const SettingsRow = styled.div`
  ${css.flex('align-center')};
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
