import styled from 'styled-components'

import { COLORS } from '@/constant/colors'
import type { TColorName, TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

import Button from '@/widgets/Buttons/Button'
import LaptopSVG from '@/icons/Works'
import PlusSVG from '@/icons/Plus'
import MoreSVG from '@/icons/menu/More'

type TWrapper = TTestable
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn()};
  position: relative;
  background: transparent;
  width: 225px;
  height: 300px;
  min-height: 80px;
  padding: 15px 20px;
  padding-left: 0;

  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;
  padding: 15px;

  transition: all 0.2s;

  &:hover {
    box-shadow: ${css.cardShadow};
    border-color: ${theme('article.digest')};
  }
`

export const GlobalSettingIcon = styled(MoreSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  position: absolute;
  top: 5px;
  right: -2px;
  opacity: 0;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const Header = styled.div`
  ${css.flexColumn()};
  margin-bottom: 12px;
`
export const Icon = styled(LaptopSVG)<{ color: TColorName }>`
  ${css.size(16)};
  fill: ${({ color }) => COLORS[color.toUpperCase()]};
  opacity: 0.65;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.3s;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 18px;
  font-weight: 600;
  margin-top: 8px;
`
export const PlusIcon = styled(PlusSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  margin-right: 2px;
`

export const AdderButton = styled(Button)`
  width: 80px;
  margin-left: -1px;
  margin-top: 8px;
`

export const MoreLink = styled.div`
  color: ${theme('link')};
  font-size: 12px;
  margin-top: 5px;

  &:hover {
    cursor: pointer;
  }

  transition: all 0.2s;
`
