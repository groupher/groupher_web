import Input from '@/widgets/Input'
import styled, { css, theme } from '@/css'

import LaptopSVG from '@/icons/Laptop'
import LinkSVG from '@/icons/Link'

export { LinkInput } from '.'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
export const LaptopIcon = styled(LaptopSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
  margin-right: 2px;

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }
  transition: fill 0.2s;
`
export const CompanyInput = styled(Input)`
  border: none;
  color: #139c9e;
  background: none;
  height: 26px;
  width: 100px;

  &::placeholder {
    color: #4e7074;
  }
`
export const LinkIcon = styled(LinkSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }
  transition: fill 0.2s;
`
