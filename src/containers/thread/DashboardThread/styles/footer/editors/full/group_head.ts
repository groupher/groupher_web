import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import MoreSVG from '@/icons/menu/MoreL'

export const Wrapper = styled.div`
  ${css.flex('align-center', 'justify-between')};
  width: 100%;
`

export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`

const iconBase = `
  fill: ${theme('article.info')};
  opacity: 0.6;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const SettingIcon = styled(MoreSVG)`
  ${css.size(14)};
  ${iconBase};
  opacity: 0;

  ${Wrapper}:hover & {
    opacity: 1;
  }
`
