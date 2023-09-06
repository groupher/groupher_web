import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column()};
  width: 100%;
  position: relative;
`
export const Desc = styled.div`
  ${css.lineClamp(2)};
  position: absolute;
  right: 70px;
  top: 100px;
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.5;
  width: 150px;
  word-break: break-all;
`
export const BannerWrapper = styled.div`
  position: relative;
  ${css.row('align-center', 'justify-between')};
  height: 68px;
  padding: 0 80px;
  border-radius: 6px;
`
export const IconBlock = styled.div`
  ${css.size(25)};
  background: ${theme('hoverBg')};
  border: 1px solid;
  border-color: ${theme('hoverBg')};
  border-radius: 3px;
`
export const AccountIcon = styled(IconBlock)`
  ${css.size(20)};
`
export const RealLogo = styled(Img)`
  ${css.size(25)};
  margin-right: 20px;
  border: 1px solid;
  border-radius: 3px;
`
export const Intro = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-left: 8px;
  min-width: 100px;
  ${css.cutRest('100px')};
`
export const TitleHolder = styled(Title)`
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.6;
`
export const ThreadWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 20px;
  margin-left: -70px;
`
export const ThreadItem = styled.div`
  font-size: 13px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
export const FeedWrapper = styled.div`
  ${css.column('align-start')}
  margin-top: 10px;
  padding: 25px 80px;
`
export const TagWrapper = styled.div<{ hasDesc: boolean }>`
  position: absolute;
  right: 70px;
  top: 150px;
  top: ${({ hasDesc }) => (hasDesc ? '150px' : '105px')};
  width: 150px;
  transition: all 0.2s;
`
export const Feed = styled.div<{ width: string }>`
  height: 10px;
  width: ${({ width }) => width};
  border-radius: 4px;
  background: ${theme('hoverBg')};
  margin-bottom: 16px;
`
