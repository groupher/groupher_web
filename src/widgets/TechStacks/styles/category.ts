import styled, { css, theme } from '@/css'
import CodeSVG from '@/icons/Code'
import DevopsSVG from '@/icons/Devops'
import FrameworkSVG from '@/icons/Framework'
import DatabaseSVG from '@/icons/Database'
import DesignSVG from '@/icons/Design'

export const Wrapper = styled.div`
  ${css.column('align-start')};
  width: 150px;
  margin-top: 26px;
  position: relative;
`
export const Spliter = styled.div`
  position: absolute;
  background: ${theme('article.digest')};
  width: 1px;
  height: 35px;
  top: 4px;
  right: 32px;
  opacity: 0.5;
`
export const CodeIcon = styled(CodeSVG)`
  ${css.size(23)};
  margin-bottom: 4px;
  fill: ${theme('article.digest')};
  opacity: 0.7;
`
export const DevopsIcon = styled(DevopsSVG)`
  ${css.size(23)};
  margin-bottom: 3px;
  opacity: 0.7;
  fill: ${theme('article.digest')};
`
export const FrameworkIcon = styled(FrameworkSVG)`
  ${css.size(20)};
  margin-bottom: 8px;
  opacity: 0.7;
  fill: ${theme('article.digest')};
`
export const DatabaseIcon = styled(DatabaseSVG)`
  ${css.size(20)};
  margin-bottom: 8px;
  opacity: 0.7;
  fill: ${theme('article.digest')};
`
export const DesignIcon = styled(DesignSVG)`
  ${css.size(20)};
  margin-bottom: 8px;
  opacity: 0.7;
  fill: ${theme('article.digest')};
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 15px;

  ${css.media.mobile`
    font-size: 13px;
    margin-top: 3px;
  `};
`
