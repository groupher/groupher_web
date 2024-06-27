import { Bar as BarBase } from '~/widgets/Common'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  width: 300px;
  height: 280px;
  z-index: 2;
  background: ${theme('htmlBg')};
  border-radius: 10px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(100, 100, 111, 0.1) 1px 2px 29px 0px;

  position: relative;
  margin-left: -80px;
  margin-top: -20px;
`
export const Header = styled.div`
  ${css.column()};
  width: 200px;
  margin-top: 25px;
  margin-bottom: 10px;
`
export const Cover = styled.div`
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 5px;

  background: ${theme('rainbow.redBg')};
  border: 1px dotted;
  border-color: ${theme('rainbow.redBg')};
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-weight: 500;
  font-size: 16px;
`
export const Version = styled.span`
  color: ${theme('hint')};
  opacity: 0.8;
  font-size: 15px;
  margin-left: 8px;
`
export const TagsWrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 2px;
  color: ${theme('hint')};
  gap: 0 8px;
`
export const TagItem = styled.div`
  ${css.row('align-center')};
  font-size: 12px;
`
export const Content = styled.div`
  ${css.column()};
  margin-top: 15px;
  width: 200px;
  gap: 10px;
`
export const Bar = styled(BarBase)`
  background: ${theme('hint')};
`
