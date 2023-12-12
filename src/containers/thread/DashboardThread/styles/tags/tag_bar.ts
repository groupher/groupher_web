import type { TColorName } from '@/spec'
import styled, { css, theme, rainbow } from '@/css'
import Input from '@/widgets/Input'

type TWrapper = { isEditMode: boolean; isSetting: boolean; hasSettingTag: boolean }
export const Wrapper = styled.div<TWrapper>`
  ${css.row('align-center')};
  width: 100%;
  height: ${({ isEditMode }) => (isEditMode ? '46px' : '40px')};
  /* margin-left: -8px; */
  padding: ${({ isEditMode }) => (isEditMode ? 0 : '10px')};
  border: ${({ isEditMode }) => (isEditMode ? 'none' : '1px solid')};
  border-color: ${({ hasSettingTag }) => {
    if (!hasSettingTag) return theme('divider')

    return theme('article.digest')
  }};
  border-radius: 5px;
  margin-bottom: 12px;

  opacity: ${({ isSetting, hasSettingTag }) => {
    if (!hasSettingTag) return 1
    return isSetting ? 1 : 0.3
  }};

  &:hover {
    border-color: ${({ isEditMode }) => (!isEditMode ? theme('article.digest') : 'divider')};
  }
  transition: all 0.1s;
`
type TDot = { color: TColorName; isEditMode?: boolean }
export const Dot = styled.div<TDot>`
  ${({ isEditMode }) => (!isEditMode ? css.circle(11) : css.circle(20))};
  background: ${({ color }) => rainbow(color)};
`
export const DotSelector = styled.div`
  ${css.circle(26)};
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${theme('editor.border')};
  background: ${theme('divider')};
  margin-left: -6px;
  margin-right: 4px;
  cursor: pointer;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  margin-left: 10px;
`
export const CatNote = styled.span`
  color: ${theme('hint')};
  font-size: 12px;
  margin-left: 12px;

  &:before {
    content: '(';
    opacity: 0.5;
    margin-right: 1px;
  }

  &:after {
    content: ')';
    opacity: 0.5;
    margin-left: 1px;
  }
`

export const InputWrapper = styled.div`
  width: auto;
`
export const Inputer = styled(Input)`
  width: 180px;
  height: 30px;
  margin-left: 10px;
`
