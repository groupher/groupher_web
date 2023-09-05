import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'

import Img from '@/Img'

export const Wrapper = styled.div`
  position: relative;
  ${css.column('align-both')};
  color: ${theme('article.digest')};
  /* background-image: linear-gradient(#043B49, #022A35); */
  background-image: ${theme('banner.linearGradient')};
  padding-top: 5%;
  padding-bottom: 5%;
  width: 100%;
  height: auto;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 550;
  margin-left: -10px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  margin-bottom: 10px;
`
export const Frame = styled.div`
  ${css.row()};
  width: 700px;
  height: 540px;
  border-radius: 12px;
  margin-top: 30px;
`

export const LeftFrame = styled.div`
  ${css.column('align-both')};
  background: #fafafa;
  width: 50%;
  height: 100%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding-bottom: 20px;
`
export const RightFrame = styled.div`
  ${css.column('align-both')};
  background: #eae9e98a;
  width: 50%;
  height: 100%;
  padding: 20px 40px;
  padding-top: 30px;

  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`
export const CommunityLogo = styled(Img)`
  ${css.size(50)};
`
export const CommunityTitle = styled.div`
  font-size: 18px;
  color: ${theme('article.title')};
  margin-top: 15px;
  font-weight: 500;
`
export const CommunityDesc = styled.div`
  font-size: 13px;
  ${css.cutRest('200px')};
  color: ${theme('hint')};
`
export const GotoLink = styled(Link)`
  ${css.row('align-both')};
  color: ${theme('article.title')};
  text-decoration: none;
  font-size: 13px;
  min-width: 90px;
  height: 34px;
  border-radius: 8px;
  background: #eae9e98a;
  margin-top: 30px;

  &:hover {
    background: ${theme('hoverBg')};
    text-decoration: underline;
    cursor: pointer;
  }
`

export const GoDashLink = styled(GotoLink)`
  background: #fafafa;
  margin-top: 10px;

  &:hover {
    background: #fafafa;
  }
`
export const DashItem = styled(Link)`
  ${css.row()};
  width: 100%;
  padding: 15px 25px;
  border-radius: 6px;
  text-decoration: none;

  &:hover {
    background: #fafafa;
    cursor: pointer;
    text-decoration: none;
  }

  transition: all 0.2s;
`
export const DashIntro = styled.div`
  ${css.column('align-start')};
`
export const DashTitle = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  font-weight: 500;
  margin-bottom: 2px;

  ${DashItem}:hover & {
    color: ${theme('article.title')};
    font-weight: 500;
  }
`
export const DashDesc = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
`
