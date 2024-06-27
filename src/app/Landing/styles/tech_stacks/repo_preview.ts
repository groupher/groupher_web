import styled, { css } from '~/css'

import StarSVG from '~/icons/github/Star'
import ForkSVG from '~/icons/github/Fork'
import ContributeSVG from '~/icons/github/Contribute'

export const Wrapper = styled.div`
  margin-top: 22px;
  padding: 20px 18px;
  width: 100%;
  height: 148px;
  background: rgb(24 24 24 / 46%);
  backdrop-filter: blur(10px);
  color: #ababab;
  border-radius: 8px;
  position: relative;
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    border-color: #615F62;
  }

  transition: all .2s;
`
export const Repo = styled.div`
  font-size: 18px;
  height: 100%;
`
export const RepoName = styled.span`
  font-weight: 500;
  color: #e0e0e0;
`
export const RepoDesc = styled.div`
  font-size: 14px;
  opacity: 0.8;
  width: 260px;
  word-break: break-all;
`
export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 18px;
`
export const Info = styled.div`
  ${css.row('align-center')};
  color: #e0e0e0;
  font-size: 14px;
  margin-right: 12px;
`
const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(13)};
    fill: #ababab;
    margin-right: 5px;
  `
}
export const Icon = {
  Star: commonIcon(StarSVG),
  Fork: commonIcon(ForkSVG),
  Contribute: commonIcon(ContributeSVG),
}

export const LangBar = styled.div`
  width: 100%;
  filter: brightness(0.8);
  position: absolute;
  bottom: 0;
  left: 0;
`
