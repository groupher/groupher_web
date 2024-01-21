import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  padding: 0 15px;
  padding-bottom: 0;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 100%;
  height: 56px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 0;
`
export const CommunityLogo = styled.div`
  ${css.size(20)};
  background: ${theme('gradientBg.orange')};
  border-radius: 4px;
  margin-right: 5px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 14px;
`
export const Links = styled.div`
  ${css.row('align-both')};
  margin-left: -8px;
  gap: 0 10px;
`
export const LinkName = styled.div`
  font-size: 12px;
`

export const FakeAvatar = styled.div`
  width: 16px;
  height: 5px;
  background: ${theme('divider')};
  border-radius: 5px;
`
