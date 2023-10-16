import styled from 'styled-components'

import Button from '@/widgets/Buttons/Button'
import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-start')};
  padding: 5px 10px;
  margin-top: 10px;
`
export const PlanTitle = styled.div`
  color: ${theme('article.title')};
  font-weight: bold;
  width: 150px;
  font-size: 0.9rem;
  margin-top: 2px;
`
export const GirlTitle = styled(PlanTitle)`
  ${css.column()};
  color: ${theme('rainbow.pink')};
`
export const TitleDesc = styled.div<{ pink: boolean }>`
  color: ${({ pink }) => (pink ? theme('rainbow.pinkLite') : theme('article.digest'))};
`
export const PlanDesc = styled.div`
  ${css.columnGrow()};
  color: ${theme('article.digest')};
`
export const PurchaseButton = styled.div`
  margin-top: 2px;
  width: 130px;
  text-align: center;
`
const pinkHover = `
  background-color: ${theme('rainbow.pink')};
  border-color: ${theme('rainbow.pink')};
  opacity: 0.6;
`
export const PinkButton = styled(Button)`
  color: white;
  background-color: ${theme('rainbow.pink')};
  border-color: ${theme('rainbow.pink')};
  &:focus {
    ${pinkHover};
    color: ${theme('rainbow.pinkBtnText')};
  }
  &:hover {
    ${pinkHover};
    color: ${theme('rainbow.pinkBtnText')};
  }
  &:active {
    ${pinkHover};
  }
`
export const DescLine = styled.div<{ green: boolean }>`
  color: ${({ green }) => (green ? theme('rainbow.green') : '')};
  font-size: 0.85rem;
  margin-bottom: 4px;
`
export const MoreLink = styled.a`
  color: ${theme('markdown.link')};
  font-size: 0.8rem;

  &:hover {
    font-weight: bold;
    text-decoration: underline;
    color: ${theme('markdown.link')};
  }
`
export const BadPrice = styled.span`
  text-decoration: line-through;
  color: ${theme('rainbow.red')};
`
export const GoodPrice = styled.span`
  color: ${theme('rainbow.green')};
  font-weight: bold;
`

export const BadgeWrapper = styled.div`
  width: 130px;
  text-align: center;
  margin-top: -2px;
`

export const BadgeIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(40)};
`
