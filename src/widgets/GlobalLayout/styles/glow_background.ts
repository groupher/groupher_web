import styled from '@/css'

import type { TGlowEffect } from '@/spec'
import { GLOW_EFFECTS_DAY, GLOW_EFFECTS_NIGHT } from '@/constant/glow_effect'
import THEME from '@/constant/theme'

export const Wrapper = styled('div')<TGlowEffect>`
  background: ${({ glowType, $curTheme }) => {
    const GLOW_EFFECTS = $curTheme === THEME.DAY ? GLOW_EFFECTS_DAY : GLOW_EFFECTS_NIGHT
    return `
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].LEFT.X} ${GLOW_EFFECTS[glowType].LEFT.Y}, ${GLOW_EFFECTS[glowType].LEFT.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].LEFT.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].RIGHT1.X} ${GLOW_EFFECTS[glowType].RIGHT1.Y}, ${GLOW_EFFECTS[glowType].RIGHT1.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].RIGHT1.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].MAIN.X} ${GLOW_EFFECTS[glowType].MAIN.Y}, ${GLOW_EFFECTS[glowType].MAIN.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].MAIN.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].RIGHT2.X} ${GLOW_EFFECTS[glowType].RIGHT2.Y}, ${GLOW_EFFECTS[glowType].RIGHT2.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].RIGHT1.RADIUS});
  `
  }};

  filter: saturate(1.2);

  inset: 0;
  position: ${({ glowPosition }) => glowPosition};
  // width & height must be 100%, without it the wechat will not work
  height: ${({ glowPosition }) => (glowPosition === 'absolute' ? '600px' : '100%')};
  width: 100%;
  opacity: ${({ glowOpacity }) => `${parseFloat(glowOpacity)}` || 1};

  z-index: -1;
`

export const holder = 1
