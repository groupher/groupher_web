import styled, { css, animate, theme } from '~/css'

import CrossSVG from '~/icons/CloseCross'
import UploadIcon from '~/icons/Upload'
import TurboSVG from '~/icons/Turbo'

export const Wrapper = styled.div`
  position: relative;
`
export const InnerWrapper = styled.div`
  position: relative;
`
export const InputFile = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;
`
export const Label = styled.label<{ $loading: boolean }>`
  display: block;
  cursor: pointer;

  filter: ${({ $loading }) => ($loading ? 'brightness(0.8)' : 'none')};

  z-index: 100;
  transition: all 0.1s;

  ${InnerWrapper}:hover & {
    filter: brightness(0.8);
  }
`
export const HintIcon = styled(UploadIcon)`
  opacity: 0;
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
  fill: white;
  ${css.size(20)};

  ${InnerWrapper}:hover & {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const TurboIcon = styled(TurboSVG)`
  position: absolute;
  ${css.size(30)};
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  fill: white;
  z-index: 2;

  animation: ${animate.rotate360} 0.5s linear infinite;
`

export const CloseBtn = styled.div`
  ${css.circle(16)};
  ${css.row('align-both')};
  background: ${theme('button.fg')};
  box-shadow: ${css.cardShadow};
  border: 1px solid;
  border-color: ${theme('divider')};

  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 1;
  opacity: 0;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    transform: rotate(90deg);
  }

  transition: all 0.3s;
`
export const CrossIcon = styled(CrossSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};

  &:hover {
    fill: ${theme('rainbow.red')};
  }
`
