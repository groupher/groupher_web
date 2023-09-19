// @
/*
 * this is a wrapper for [react-select](https://react-select.com/)
 * see detail props in https://react-select.com/props
 * Select
 *
 */

import { FC, memo } from 'react'
import { useTheme } from 'styled-components'
import ReactSelect from 'react-select'
import CreatableReactSelect from 'react-select/creatable'

import type { TSelectOption, TThemeMap } from '@/spec'
import { buildLog } from '@/logger'

import { IndicatorsContainer } from './components'

import { Wrapper, getSelectStyles } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:Select:index')

type TProps = {
  testid?: string
  placeholder?: string
  options: TSelectOption[]
  className?: string
  creatable?: boolean

  isMulti?: boolean
  closeMenuOnSelect?: boolean
  isClearable?: boolean
  value?: TSelectOption | TSelectOption[] | null

  onChange?: (option: TSelectOption | TSelectOption[]) => void
  onCreateOption?: (newopt: string) => void
}

const Select: FC<TProps> = ({
  testid = 'widget-select',
  placeholder = '请选择..',
  options,
  isMulti = false,
  isClearable = false,
  closeMenuOnSelect = true,
  onChange = log,
  value = null,
  creatable = false,
  className = '',
  onCreateOption = log,
}) => {
  // @ts-ignore
  const theme: TThemeMap = useTheme()
  const styles = getSelectStyles(theme)

  const baseProps = {
    value,
    options,
    onChange,
    closeMenuOnSelect,
    placeholder,
    isClearable,
    components: { IndicatorsContainer },
    styles: {
      ...styles,
      // menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
      // menu: (provided) => ({ ...provided, zIndex: 9999 }),
    },
    theme: (theme) => ({
      ...theme,
      borderRadius: 2,
      colors: {
        ...theme.colors,
        primary: 'black',
      },
    }),
  }

  return (
    <Wrapper testid={testid} className={className}>
      {!creatable ? (
        <ReactSelect {...baseProps} isMulti={isMulti} />
      ) : (
        <CreatableReactSelect {...baseProps} onCreateOption={onCreateOption} />
      )}
    </Wrapper>
  )
}

export default memo(Select)
