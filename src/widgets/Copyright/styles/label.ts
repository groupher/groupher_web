import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import CCSVG from '@/icons/article/CC'
import CCForbidSVG from '@/icons/article/CCForbid'
import CCApproveSVG from '@/icons/article/CCApprove'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  cursor: pointer;
`
const icon = `
  ${css.size(12)};

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }

  transition: fill 0.2s;
`
const CC = styled(CCSVG)`
  ${icon};
  fill: ${theme('article.info')};
`
const CCForbid = styled(CCForbidSVG)`
  ${icon};
  fill: ${theme('article.info')};
`
const CCApprove = styled(CCApproveSVG)`
  ${icon};
  fill: ${theme('article.info')};
`

export const Icon = {
  CC,
  CCForbid,
  CCApprove,
}

export const Text = styled.div`
  font-size: 12px;
  color: ${theme('article.info')};
  margin-left: 6px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
  transition: color 0.2s;
`
