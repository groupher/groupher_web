import styled from 'styled-components'

import { TActive } from '@/spec'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import { SelectItem as SelectItemBase } from '.'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 240px;
`
export const GroupWrapper = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 10px;
`
export const SelectItem = styled(SelectItemBase)`
  ${css.flex('align-center')};
  margin-bottom: 2px;
  margin-right: 3px;
`

type THashSign = TActive & { color?: string }
export const DotSign = styled.div<THashSign>`
  ${css.circle(8)};
  background: ${({ color }) => (color ? theme(`baseColor.${camelize(color)}Bg`) : 'none')};

  margin-right: 8px;
  margin-top: -1px;
  opacity: ${theme('tags.dotOpacity')};

  transition: filter 0.1s;
`
export const GroupTitle = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.6;
  margin-left: 5px;
  margin-bottom: 5px;
  margin-top: 3px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};

  ${SelectItem}:hover & {
    color: ${theme('article.title')};
  }
`
