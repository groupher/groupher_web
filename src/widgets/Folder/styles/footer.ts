import styled, { css, theme } from '~/css'
import { Wrapper as FolderWrapper } from '.'

export const Wrapper = styled.div`
  position: relative;
  ${css.column('align-center')};
  text-align: center;
  margin-top: 4px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  text-align: center;
  margin-top: 5px;
`
export const Name = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  ${css.cutRest('68px')};
`
export const FolderInfoPopWrapper = styled.div`
  width: 100px;
  height: 160px;
  overflow-x: hidden;
  overflow-y: scroll;
`
export const MenuWrapper = styled.div`
  position: absolute;
  right: -10px;
  top: -8px;
  opacity: 0;
  /* visibility: hidden; */

  ${Title}:hover & {
    opacity: 1;
  }
`
export const HintWrapper = styled.div`
  ${css.column('align-center')};
  height: 14px;
  width: 100%;
`
export const Hint = styled.div`
  color: ${theme('button.primary')};
  font-size: 12px;
  cursor: pointer;
`
export const AddHint = styled(Hint)`
  display: none;
  ${FolderWrapper}:hover & {
    display: block;
  }
`
