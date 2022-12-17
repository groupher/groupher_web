import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import EditSVG from '@/icons/EditPen'
import SettingSVG from '@/icons/Setting'

import Input from '@/widgets/Input'

type TWrapper = { isEditMode: boolean; isSetting: boolean; hasSettingTag: boolean }
export const Wrapper = styled.div<TWrapper>`
  ${css.flex('align-center')};
  width: 100%;
  height: ${({ isEditMode }) => (isEditMode ? '46px' : '40px')};
  /* margin-left: -8px; */
  padding: ${({ isEditMode }) => (isEditMode ? 0 : '10px')};
  border: ${({ isEditMode }) => (isEditMode ? 'none' : '1px solid')};
  border-color: ${theme('divider')};
  border-radius: 5px;
  margin-bottom: 12px;

  opacity: ${({ isSetting, hasSettingTag }) => {
    if (!hasSettingTag) return 1
    return isSetting ? 1 : 0.3
  }};

  margin-left: ${({ isSetting, hasSettingTag }) => {
    if (!hasSettingTag) return '-8px'

    return isSetting ? '-30px' : '-8px'
  }};

  &:hover {
    background: ${({ isEditMode }) => (!isEditMode ? theme('hoverBg') : 'transparent')};
  }

  transition: all 0.2s;
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
export const Actions = styled.div`
  ${css.flex('align-center')};
  opacity: 0;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const EditIcon = styled(EditSVG)<{ onClick: () => void }>`
  ${css.size(14)};
  fill: ${theme('article.digest')};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const SettingIcon = styled(SettingSVG)<{ onClick: () => void }>`
  ${css.size(13)};
  fill: ${theme('article.digest')};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const InputWrapper = styled.div`
  width: auto;
`
export const Inputer = styled(Input)`
  width: 180px;
  height: 30px;
  margin-left: 10px;
`
