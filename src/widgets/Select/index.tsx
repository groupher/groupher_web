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

import type { TSelectOption, TThemeMap } from '@/spec'
import { buildLog } from '@/utils/logger'

import { IndicatorsContainer } from './components'

import { Wrapper, getSelectStyles } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:Select:index')

type TProps = {
  testid?: string
  placeholder?: string
  options: TSelectOption[]
  className?: string

  isMulti?: boolean
  closeMenuOnSelect?: boolean
  isClearable?: boolean
  value?: TSelectOption | TSelectOption[] | null

  onChange?: (option: TSelectOption | TSelectOption[]) => void
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
  className = '',
}) => {
  // @ts-ignore
  const theme: TThemeMap = useTheme()
  const styles = getSelectStyles(theme)

  return (
    <Wrapper testid={testid} className={className}>
      <ReactSelect
        value={value}
        options={options}
        placeholder={placeholder}
        styles={styles}
        // @ts-ignore
        components={{ IndicatorsContainer }}
        onChange={onChange}
        closeMenuOnSelect={closeMenuOnSelect}
        isMulti={isMulti}
        theme={(theme) => ({
          ...theme,
          borderRadius: 2,
          colors: {
            ...theme.colors,
            primary: 'black',
          },
        })}
        isClearable={isClearable}
      />
    </Wrapper>
  )
}

export default memo(Select)
