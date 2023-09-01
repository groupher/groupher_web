import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

import CommunityFaceLogo from '@/widgets/CommunityFaceLogo'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  min-height: 150px;
  margin-top: 40px;
  padding: 0;
`
export const CommunityWrapper = styled.div`
  ${css.column('align-center')};
  margin-top: 30px;
`
export const Logo = styled(CommunityFaceLogo)`
  ${css.size(36)};
  border-radius: 5px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 5px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  text-align: center;
  font-size: 14px;
  margin-bottom: 25px;
  padding: 0 30px;
`
