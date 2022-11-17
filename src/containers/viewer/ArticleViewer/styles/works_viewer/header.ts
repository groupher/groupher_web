import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-start', 'justify-between')};
  width: 100%;
  height: 100px;
`
export const WorksWrapper = styled.div`
  ${css.flex('align-center')};
  flex-grow: 1;
`
export const Cover = styled(Img)`
  ${css.size(70)};
  border-radius: 5px;
  margin-right: 25px;
`
export const Intro = styled.div`
  ${css.flexColumn()};
`
export const Title = styled.div`
  ${css.cutRest('350px')};
  font-size: 22px;
  color: ${theme('article.title')};
`
export const Desc = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};
  margin-top: 4px;
`
export const ContactWrapper = styled.div`
  margin-top: 10px;
  ${css.flex('align-center')};
`

export const CommonInfo = styled.div`
  ${css.flexColumn('align-end')}
  width: 200px;
`
export const PublishWrapper = styled.div`
  ${css.flex('align-center')}
  margin-top: 10px;
`
export const PublishHint = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
`
export const PubDate = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  margin-left: 4px;
  margin-top: -1px;
`
export const EditedHint = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};

  &:before {
    content: '(';
  }
  &:after {
    content: ')';
  }
`
export const BaseWrapper = styled.div`
  ${css.flex('align-center')};
  margin-top: 9px;
  margin-right: -3px;
`
