import styled, { css, theme } from '~/css'
import CollectionSVG from '~/icons/CollectionBookmark'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  height: 80px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  padding-bottom: 12px;
  margin-top: 8px;
`
export const CollectWrapper = styled.div`
  ${css.row('align-center')};
  cursor: pointer;
`
export const CollectIcon = styled(CollectionSVG)`
  ${css.size(16)};
  fill: ${theme('article.info')};

  ${CollectWrapper}:hover & {
    fill: #129497;
  }
  transition: fill 0.2s;
`
export const CollectText = styled.div`
  font-size: 14px;
  color: ${theme('article.info')};
  margin-top: 1px;
  margin-left: 4px;

  ${CollectWrapper}:hover & {
    color: #129497;
  }
  transition: color 0.2s;
`
export const BaseWrapper = styled.div`
  ${css.row('align-center')};
  width: 100%;
`
