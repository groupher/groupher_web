import styled from 'styled-components'

import type { TActive, TColorName } from '@/spec'
import { COLORS } from '@/constant/colors'
import css, { theme } from '@/css'
import { camelize } from '@/fmt'

import FormInput from '@/widgets/Input'

export const Wrapper = styled.div`
  padding: 2px 0;
  width: 145px;
`
export const Item = styled.div<TActive>`
  ${css.row('align-center')};
  padding: 4px 5px;
  padding-left: 10px;
  line-height: 20px;

  background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 10px;
  }

  transition: all 0.2s;
`
export const IconWrapper = styled.div`
  ${css.size(15)};
  ${css.row('align-both')};
  margin-top: -2px;
  opacity: 0.8;

  ${Item}:hover & {
    opacity: 1;
  }
`
export const Title = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-left: 10px;

  ${Item}:hover & {
    color: ${theme('article.title')};
  }
`

export const ColorWrapper = styled.div`
  ${css.row('align-both')};
  flex-wrap: wrap;
  margin-top: 8px;
  padding-bottom: 14px;
  gap: 6px 10px;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.25turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`

type TColorBlock = { color: TColorName } & TActive
export const ColorBlock = styled.div<TColorBlock>`
  ${css.size(24)};
  ${css.row('align-both')};
  border-radius: 6px;
  background: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};
  border: 1px dotted;
  border-color: ${({ $active, color }) =>
    $active ? theme(`baseColor.${camelize(color)}`) : 'transparent'};

  &:hover {
    border-color: ${({ color }) => theme(`baseColor.${camelize(color)}`)};
    cursor: pointer;
  }
  transition: all 0.25s;
`

export const ColorCenter = styled.div<{ color: TColorName }>`
  ${css.circle(12)};
  background: ${({ color }) => COLORS[color]};
`

export const Input = styled(FormInput)`
  text-align: left;
  padding: 3px 5px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  padding-left: 5px;
  height: 26px;

  width: 124px;
  font-size: 12px;

  ::placeholder {
    font-size: 11px;
  }
`
