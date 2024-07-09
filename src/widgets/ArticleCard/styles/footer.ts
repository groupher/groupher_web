import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  color: ${theme('article.info')};
`
export const PublishWrapper = styled.div`
  ${css.row('align-center')};
  margin-left: 3px;
  margin-bottom: 8px;
  font-size: 13px;

  ${css.media.mobile`
    font-size: 12px;
    margin-bottom: 2px;
  `};
`
export const Bottom = styled.div`
  ${css.row('justify-between', 'align-center')};

  ${css.media.mobile`
    transform: scale(0.9);
    width: 106%;
    margin-left: -6px;
  `};
`
