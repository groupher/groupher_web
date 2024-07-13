import styled, { theme } from '~/css'
import Img from '~/Img'
import SiteLogo from '~/icons/CPLogo'

export const Logo = styled(Img)<{ noFill?: boolean }>`
  fill: ${({ noFill }) => (noFill ? '' : theme('article.digest'))};
  display: block;
`

export const HomeLogo = styled(SiteLogo)`
  fill: #007fa8;
  filter: saturate(0.8);
`
