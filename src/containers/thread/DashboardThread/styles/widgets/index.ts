import styled, { css, theme } from '@/css'

import ViewSVG from '@/icons/article/Viewed'
import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  ${css.column()};
  padding-left: 25px;
  padding-right: 50px;
`
export const TypeSelect = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-left: -10px;
  margin-bottom: 20px;
`
export const TabWrapper = styled.div`
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
`
export const BtnWrapper = styled.div`
  ${css.row('align-both')};
`
export const ViewIcon = styled(ViewSVG)`
  fill: ${theme('button.primary')};
  ${css.size(12)};
  margin-right: 8px;
`
export const HintTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  margin-bottom: 5px;
`
export const HintDesc = styled.div`
  color: ${theme('lightText')};
  font-size: 12px;
`
export const InputWrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 10px;
  margin-bottom: 10px;
`
export const InputLabel = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  width: 120px;
`
export const Inputer = styled(Input)`
  height: 30px;
  width: 150px;
`
