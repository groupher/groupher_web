import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import UploadSVG from '@/icons/Upload'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  width: 680px;
  height: 400px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
`
export const UploadIcon = styled(UploadSVG)`
  ${css.size(50)};
  fill: ${theme('article.info')};
  margin-bottom: 15px;
  opacity: 0.3;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  opacity: 0.8;
`
