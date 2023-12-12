import CommunityFaceLogo from '@/widgets/CommunityFaceLogo'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-end')};
`
export const CommunityLogo = styled(CommunityFaceLogo)`
  ${css.size(22)};
  margin-right: 22px;
  margin-bottom: 4px;
`
export const MobileHint = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  margin-bottom: 4px;
  margin-left: -10px;
  display: none;
  ${css.media.mobile`display: flex`};
`
export const MiniTab = styled.div`
  ${css.media.mobile`display: none`};
`
