import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Input from '@/widgets/Input'

type TWrapper = { isEditMode: boolean; isSetting: boolean; hasSettingTag: boolean }
export const Wrapper = styled.div<TWrapper>`
  ${css.flex('align-center')};
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

  margin-left: ${({ isSetting, hasSettingTag }) => {
    if (!hasSettingTag) return '-8px'

    return isSetting ? '-12px' : '-8px'
  }};

  &:hover {
    border-color: ${({ isEditMode }) => (!isEditMode ? theme('article.digest') : 'divider')};
  }
  transition: all 0.1s;
`
type TDot = { color: string; isEditMode?: boolean }
export const Dot = styled.div<TDot>`
  ${({ isEditMode }) => (!isEditMode ? css.circle(11) : css.size(18))};
  background: ${({ color }) => color};
  border-radius: ${({ isEditMode }) => (isEditMode ? '4px' : '100%')};
`
export const DotSelector = styled.div`
  ${css.size(26)};
  ${css.flex('align-both')};
  border: 1px solid;
  border-color: ${theme('editor.border')};
  background: white;
  border-radius: 4px;
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
  color: ${theme('article.digest')};
  opacity: 0.8;
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
