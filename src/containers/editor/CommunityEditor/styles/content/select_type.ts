import styled, { css, theme } from '~/css'

import QuestionSVG from '~/icons/Question'
import DemoSVG from '~/icons/DemoTV'

export const Wrapper = styled.div`
  ${css.row('justify-between')};
  width: 700px;
  min-height: 300px;
`
const Block = styled.div`
  ${css.column('align-start')};
  padding: 15px;
  width: 45%;
`
export const LeftBlock = styled(Block)`
  padding-left: 0;
`
export const RightBlock = styled(Block)`
  padding-right: 0;
  padding-left: 40px;
`
export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 18px;
  margin-left: -2px;
`
export const FaqIcon = styled(QuestionSVG)`
  fill: ${theme('hint')};
  ${css.size(16)};
  margin-right: 5px;
`
export const DemoIcon = styled(DemoSVG)`
  fill: ${theme('hint')};
  ${css.size(18)};
  margin-right: 8px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  line-height: 1.7;
`
export const CommunityDemoWrapper = styled.div`
  ${css.rowWrap('align-center')};
  margin-bottom: 10px;
  margin-top: -4px;
`
