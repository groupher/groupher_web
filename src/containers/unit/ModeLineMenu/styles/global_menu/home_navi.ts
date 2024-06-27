import type { TTestable } from '~/spec'
import styled, { css, theme } from '~/css'
import SiteLogo from '~/icons/CPLogo'
import ArrowSVG from '~/icons/ArrowSimple'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-both')};
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`
export const Logo = styled(SiteLogo)`
  fill: ${theme('button.primary')};
  ${css.size(15)};
  margin-top: -2px;
`
export const Block = styled.div`
  ${css.row('align-center')};
  margin-left: 8px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  font-weight: bold;
`
export const ArrowIcon = styled(ArrowSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  transform: rotate(180deg);
  margin-left: 5px;
  &:active {
    fill: #0d969e;
  }
`
