import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  width: 100%;
  position: relative;
  margin-bottom: 8px;
  padding: 8px;
  padding-bottom: 10px;
  border-bottom: 1px dashed;
  border-bottom-color: ${theme('divider')};
  margin-left: 2px;

  &:hover {
    cursor: pointer;
  }

  &:last-child {
    border-bottom: none;
  }
`
export const Header = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-bottom: 4px;
  display: none;
`
export const TimeStamp = styled.div`
  font-size: 12px;
  color: ${theme('article.info')};
`
export const Title = styled.div`
  ${css.lineClamp(1)}
  font-size: 15px;
  color: ${theme('article.title')};
  opacity: 0.8;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;

  ${Wrapper}:hover & {
    opacity: 1;
    margin-left: 2px;
  }
  transition: all .2s;
`
export const UpvotesWrapper = styled.div`
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 6px;
  padding: 2px 8px;
  transform: scale(0.8);
  margin-right: -16px;
`
