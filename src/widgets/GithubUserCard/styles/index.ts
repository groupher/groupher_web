import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row()};
  max-width: 300px;
`
export const PopAvatarWrapper = styled.div`
  margin-right: 10px;
  padding-top: 4px;
`
export const PopAvatar = styled(Img)`
  width: 80px;
  height: 80px;
`
export const UserPopInfo = styled.div`
  ${css.column()};
`
export const Username = styled.div`
  color: ${theme('article.title')};
  font-weight: bolder;
  font-size: 1rem;
`
export const UserBio = styled.div`
  color: ${theme('article.digest')};
  font-size: 0.9rem;
  margin-bottom: 10px;
`
export const UserLocation = styled.div`
  ${css.row('align-center')};
`
export const LabelIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(15)};
  margin-right: 5px;
`
export const LabelText = styled.div`
  color: ${theme('article.title')};
`
export const UserCompany = styled.div`
  ${css.row('align-center')};
`
