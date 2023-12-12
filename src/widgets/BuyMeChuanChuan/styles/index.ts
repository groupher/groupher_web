import styled, { css, theme } from '@/css'
import Img from '@/Img'

// background: #f9fcfc;
export const Wrapper = styled.div`
  ${css.column()};

  height: 100%;
  min-height: 400px;
  width: 100%;
  padding: 15px 20px;
`

export const Header = styled.div`
  height: 35px;
  text-align: center;
  margin-left: 20px;
  margin-bottom: 20px;
`
export const BuyChuanChuan = styled.div`
  ${css.row()};
`
export const ChuanChuanDesc = styled.div`
  width: 50%;
`
// source: https://unsplash.com/photos/vzX2rgUbQXM
export const FoodPic = styled.img`
  width: 80%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 10px;
`
export const ChuanChuanSelect = styled.div`
  ${css.column()};
  width: 50%;
`
export const SelectTitle = styled.div`
  ${css.row()};
  margin-left: 5px;
  color: ${theme('article.title')};
  font-size: 18px;
`
export const TeamName = styled.a`
  ${css.row()};
  color: ${theme('article.title')};
  margin-left: 6px;
  margin-right: 6px;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
    text-decoration: underline;
  }
`
export const NameLinkIcon = styled(Img)`
  fill: ${theme('banner.title')};
  ${css.size(20)};
  padding-top: 3px;
`
export const SelectDesc = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
  margin-left: 5px;
  font-size: 14px;
  color: ${theme('article.digest')};
`
export const SelectHolder = styled.div`
  flex-grow: 1;
`
