import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  z-index: 1;
  position: absolute;
  top: 120px;
  left: 130px;
`
const Item = styled.div`
  position: absolute;
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  border: 2px solid;
  border-color: ${theme('htmlBg')};
  border-radius: 15px;
  background: ${theme('htmlBg')};
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
  height: 42px;
  font-size: 13px;
`
export const PostItem = styled.div`
  /*  can not re-use Item styles here cause styled-components bug */
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  border: 3px solid;
  border-color: ${theme('htmlBg')};
  border-radius: 15px;
  background: ${theme('htmlBg')};
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
  width: 100px;
  height: 42px;
  padding-bottom: 8px;
  font-size: 13px;
  z-index: 9;

  background: ${theme('gradientBg.blue')};
  font-weight: 500;
  border-radius: 13px;
  position: absolute;
  top: -8px;
  height: 48px;
  z-index: 10;
`
export const KanbanItem = styled(Item)`
  width: 100px;
  left: 100px;
  top: -3px;
  width: 80px;
  z-index: 8;
  height: 45px;
  padding-bottom: 11px;
  /* background: ${theme('gradientBg.purple')}; */
`
export const ChangelogItem = styled(Item)`
  width: 100px;
  left: 175px;
  top: -1px;
  z-index: 7;
  padding-bottom: 8px;
  /* background: ${theme('gradientBg.pink')}; */
`
export const DocItem = styled(Item)`
  width: 90px;
  left: 260px;
  z-index: 6;
  height: 40px;
  top: 2px;
  padding-bottom: 12px;
  padding-left: 5px;
  /* background: ${theme('gradientBg.green')}; */
`
export const UserItem = styled(Item)`
  left: 340px;
  z-index: 5;
  height: 40px;
  width: 80px;
  top: 6px;
  padding-bottom: 16px;
  padding-left: 5px;
  /* background: ${theme('gradientBg.orange')}; */
`
