import type { TActive, TColor } from '@/spec'
import styled, { css, theme, rainbow } from '@/css'
import MarkdownSVG from '@/icons/Markdown'
import Img from '@/Img'

export const Wrapper = styled.div`
  padding: 15px;
  width: 100%;
  height: 320px;
`
export const Content = styled.div`
  ${css.column()};
  padding: 10px;
  width: 100%;
  height: 90%;
  background: ${theme('htmlBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;
  box-shadow: rgb(96 96 96 / 9%) 0px 2px 16px 0px;
  margin-top: 10px;
  position: relative;
`
export const Header = styled.div`
  ${css.row('align-center')};
`
export const Mention = styled.div`
  color: ${theme('rainbow.blue')};
  font-size: 12px;
  margin-left: 7px;
`
export const Text = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-left: 8px;
  margin-top: 2px;
`
export const Highlight = styled.span<TActive & TColor>`
  color: ${theme('rainbow.cyan')};
  margin-left: 1px;
  margin-right: 1px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 1px;
    background: ${(props) => {
      const { $color } = props
      // @ts-ignore
      const colorVal = rainbow($color)(props)

      return `linear-gradient(180deg, transparent 30%, ${colorVal} 0)`
    }};
    width: 100%;
    height: 8px;
    opacity: 0.1;
    border-radius: 3px;
  }
`
export const DemoPic = styled(Img)`
  opacity: 0.8;
  width: 180px;
  height: 65px;
  object-fit: cover;
  border-radius: 5px;
  margin-left: 8px;
  margin-top: 8px;
  filter: saturate(0.7);
`

export const MarkdownIcon = styled(MarkdownSVG)`
  ${css.size(16)};
  fill: ${theme('rainbow.blue')};
  position: absolute;
  bottom: 10px;
  left: 18px;
  opacity: 0.3;
`
