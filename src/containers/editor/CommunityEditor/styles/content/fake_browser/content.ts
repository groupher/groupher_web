import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 100%;
`
export const BannerWrapper = styled.div`
  position: relative;
  ${css.flex('align-center', 'justify-between')};
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
  ${css.flex('align-center')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-left: 8px;
`
export const TitleHolder = styled(Title)`
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.6;
`
export const ThreadWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 15px;
`
export const ThreadItem = styled.div`
  font-size: 13px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
export const FeedWrapper = styled.div`
  ${css.flexColumn('align-start')}
  margin-top: 10px;
  padding: 25px 80px;
`
export const Feed = styled.div<{ width: string }>`
  height: 10px;
  width: ${({ width }) => width};
  border-radius: 4px;
  background: ${theme('hoverBg')};
  margin-bottom: 16px;
`
