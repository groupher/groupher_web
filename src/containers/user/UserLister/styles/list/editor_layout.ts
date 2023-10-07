import Link from 'next/link'
import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/css'
import CitySVG from '@/icons/City'

export const Wrapper = styled.div``

export const UserWrapper = styled.div`
  ${css.row()};
  width: 100%;
  margin-bottom: 10px;
  margin-right: 5px;
  padding: 20px 10px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
`
export const UserAvatar = styled(Img)`
  ${css.size(55)};
  border-radius: 42%;
  margin-top: 5px;

  ${css.media.mobile`
    ${css.size(30)};
`};
`
export const UserBrief = styled.div`
  ${css.columnGrow('justify-between')};
  margin-left: 24px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};

  ${css.media.tablet`
    ${css.column('align-start')};
  `};
`
export const Desc = styled.div`
  font-size: 15px;
  margin-top: 2px;
  margin-bottom: 5px;
  color: ${theme('article.digest')};
`
export const Nickname = styled(Link)`
  color: ${theme('article.title')};
  text-decoration: none;
  font-size: 16px;

  &:hover {
    color: ${theme('article.title')};
    text-decoration: underline;
  }
`
export const Location = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  margin-left: 10px;
  opacity: 0.8;

  ${css.media.tablet`
    ${css.cutRest('80px')};
    margin-left: 0;
    margin-bottom: 3px;
  `};

  ${css.media.mobile`
    ${css.cutRest('60px')};
    margin-left: 0;
    margin-bottom: 3px;
  `};
`
export const City = styled.div`
  ${css.cutRest('200px')};
  ${css.media.tablet`
    ${css.cutRest('80px')};
    margin-left: 0;
    margin-bottom: 3px;
  `};

  ${css.media.mobile`
    ${css.cutRest('60px')};
    margin-left: 0;
    margin-bottom: 3px;
  `};
`
export const CityIcon = styled(CitySVG)`
  fill: ${theme('article.digest')};
  ${css.size(13)};
  margin-right: 2px;
`
export const Action = styled.div`
  color: ${theme('article.digest')};
  width: 100px;
  margin-top: 5px;
`
