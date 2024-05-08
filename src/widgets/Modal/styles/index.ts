import styled, { css, theme, animate, zIndex } from '@/css'
import type { TActive, TThemeName } from '@/spec'
import { GLOW_EFFECTS_DAY, GLOW_EFFECTS_NIGHT } from '@/constant/glow_effect'
import THEME from '@/constant/theme'
import CloseCrossSVG from '@/icons/CloseLight'

// display: ${props => (props.show ? 'block' : 'none')};
export const Mask = styled.div<TActive>`
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${zIndex.modalOverlay};
  display: ${({ show }) => (show ? 'block' : 'none')};
  background: ${theme('modal.mask')};
`
type TWrapper = {
  background: string
  width: string
  mode: string
  offsetTop: string
  offsetLeft: string
}
export const Wrapper = styled.div<TWrapper>`
  position: relative;
  background-color: ${({ background }) =>
    background === 'default' ? theme('modal.bg') : theme('drawer.bg')};
  margin: 0 auto;
  top: ${({ offsetTop }) => offsetTop};
  width: ${({ width }) => width};
  height: auto;
  border-radius: 8px;
  min-height: 280px;
  max-height: 65vh;
  box-shadow: ${theme('modal.shadow')};
  border: 1px solid;
  border-color: ${theme('popover.borderColor')};
  animation: ${animate.jump} 0.3s linear;
  margin-left: ${({ offsetLeft }) => offsetLeft};

  ${css.media.tablet`width: 460px`};
  ${css.media.mobile`width: 320px`};
`
export const ChildrenWrapper = styled.div`
  min-height: 280px;
  /* height: 100%; */
  height: auto;
  overflow-y: scroll;
`
type TCloseBtn = { mode: string }
export const CloseBtn = styled(CloseCrossSVG)<TCloseBtn>`
  position: absolute;
  top: 16px;
  right: 18px;
  fill: ${theme('article.info')};
  ${css.size(20)};
  z-index: ${zIndex.modalCloseBtn};
  opacity: 0.8;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    opacity: 1;
  }

  &:active {
    transform: scale(0.8);
  }

  transition: all 0.2s;
`
export const EscHint = styled.div<{ mode: string }>`
  color: ${({ mode }) => (mode === 'default' ? theme('font') : theme('rainbow.red'))};
  opacity: 0.7;
  position: absolute;
  top: 35px;
  right: -44px;
  font-size: 13px;
`

type TGlowLight = { $curTheme?: TThemeName; glowType: string }
export const GlowLight = styled.div<TGlowLight>`
    background: ${({ glowType, $curTheme }) => {
      const GLOW_EFFECTS = $curTheme === THEME.DAY ? GLOW_EFFECTS_DAY : GLOW_EFFECTS_NIGHT
      return `
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].LEFT.X} ${GLOW_EFFECTS[glowType].LEFT.Y}, ${GLOW_EFFECTS[glowType].LEFT.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].LEFT.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].RIGHT1.X} ${GLOW_EFFECTS[glowType].RIGHT1.Y}, ${GLOW_EFFECTS[glowType].RIGHT1.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].RIGHT1.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].MAIN.X} ${GLOW_EFFECTS[glowType].MAIN.Y}, ${GLOW_EFFECTS[glowType].MAIN.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].MAIN.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].RIGHT2.X} ${GLOW_EFFECTS[glowType].RIGHT2.Y}, ${GLOW_EFFECTS[glowType].RIGHT2.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].RIGHT1.RADIUS});
  `
    }};
  position: absolute;
  width: 100%;
  height: 60%;
  opacity: 0.68;
  transform: rotateY(180deg) ;
  top: 0;
  left: 0;
`
