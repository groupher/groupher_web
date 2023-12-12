import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

import CommunityFaceLogo from '@/widgets/CommunityFaceLogo'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  min-height: 150px;
  margin-top: 30px;
  padding: 0;
`
export const Header = styled.div`
  ${css.row('align-center', 'justify-between')};
  height: 50px;
  width: 100%;
  padding-left: 10px;
  padding-right: 14px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const CommunityWrapper = styled.div`
  width: 100%;
  ${css.rowWrap('align-center')};
  margin-top: 8px;
  margin-bottom: 50px;
`
export const CommunityCard = styled.div<{ margin: boolean }>`
  ${css.row('align-center')};
  padding-left: 15px;
  border-radius: 10px;
  height: 40px;
  margin-bottom: 10px;
  background: #023744;
  width: 48%;
  margin-left: ${({ margin }) => (margin ? '10px' : 0)};
`
export const CommunityLogo = styled(CommunityFaceLogo)`
  ${css.size(15)};
`
export const CommunityTitle = styled.div`
  font-size: 14px;
  margin-left: 10px;
  color: ${theme('article.title')};
  ${css.cutRest('100px')}
`
