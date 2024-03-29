import styled, { css, theme } from '@/css'
import SettingSVG from '@/icons/Setting'
import { BaseSection } from '.'

export const Wrapper = styled.div`
  ${css.column()};
`
export const Section = styled(BaseSection)``

export const PreviewWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 30px;
  width: calc(100% + 40px);

  ${css.media.mobile`
    width: 100%;
  `}
`
export const HoverMask = styled.div`
  ${css.column('align-center')};
  position: relative;
`
export const UploadIcon = styled(SettingSVG)`
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 13px);
  ${css.size(25)};
  fill: white;
  opacity: 0;
  z-index: 1;
  cursor: pointer;

  ${HoverMask}:hover & {
    opacity: 1;
  }
  transition: all 0.2s;
`

type TPreviewImage = { effect: string; noHover?: boolean; $darker: boolean }
export const PreviewImage = styled.div<TPreviewImage>`
  ${css.column('align-both')};
  border: 1px solid;
  border-color: ${theme('divider')};
  background-color: ${theme('hoverBg')};

  width: 296px;
  height: 180px;
  border-radius: 4px;
  ${({ effect }) => effect || ''};
  filter: ${({ $darker }) => `brightness(${$darker ? 0.85 : 1})`};

  ${({ noHover }) =>
    !noHover
      ? `&:hover {
    filter: brightness(0.8);
    cursor: pointer;
  }`
      : ''};

  transition: all 0.2s;
`
export const PreviewerWrapper = styled.div`
  ${css.column('align-center')};
`
export const RealPreview = styled.div`
  ${css.column('align-center')};
  position: relative;
  overflow: hidden;
`
type TContentBlock = { hasShadow?: boolean; $bgColor: string }
export const ContentBlock = styled.div<TContentBlock>`
  position: absolute;
  top: 0px;
  left: 30px;
  width: 240px;
  height: 180px;
  background: ${({ $bgColor }) => $bgColor};
  backdrop-filter: blur(50px);
  z-index: 2;
  padding: 15px;

  box-shadow: ${({ hasShadow }) =>
    hasShadow ? 'rgb(100 100 111 / 20%) 0px 7px 29px 0px;' : 'none'};

  transition: all 0.2s;
`
