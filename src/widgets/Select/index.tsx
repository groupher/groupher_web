// @
/*
 * this is a wrapper for [react-select](https://react-select.com/)
 * see detail props in https://react-select.com/props
 * Select
 *
 */

import { type FC, memo } from 'react'
import ReactSelect, { components } from 'react-select'
import CreatableReactSelect from 'react-select/creatable'

import type { TSelectOption, TSpace } from '~/spec'
import useTheme from '~/hooks/useTheme'

import { Row, Space } from '~/widgets/Common'

import { IndicatorsContainer } from './components'

import { Wrapper, getSelectStyles } from './styles'

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
} & TSpace

const CustomOption = (props) => {
  const { label, icon } = props.data
  const Icon = icon || null

  return (
    <components.Option {...props}>
      <Row>
        {icon && <Icon />}
        <span>{label}</span>
      </Row>
    </components.Option>
  )
}

const CustomSingleValue = (props) => {
  const { label, icon } = props.data
  const Icon = icon || null

  return (
    <components.SingleValue {...props}>
      <Row>
        <Space left={-5}>{icon && <Icon />}</Space>
        <span>{label}</span>
      </Row>
    </components.SingleValue>
  )
}

const Select: FC<TProps> = ({
  testid = 'widget-select',
  placeholder = '请选择..',
  options,
  isMulti = false,
  isClearable = false,
  closeMenuOnSelect = true,
  onChange = console.log,
  value = null,
  creatable = false,
  className = '',
  onCreateOption = console.log,
  ...restProps
}) => {
  // @ts-ignore
  const { themeMap } = useTheme()
  const styles = getSelectStyles(themeMap)

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
      menu: (base) => ({
        ...base,
        backgroundColor: themeMap.htmlBg,
        marginTop: 0,
      }),
      menuList: (base) => ({
        ...base,
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 1,
      }),
      control: (base) => ({
        ...base,
        backgroundColor: themeMap.alphaBg,
        borderColor: themeMap.editor.border,
        '&:hover': {
          borderColor: themeMap.editor.border,
        },
      }),
      option: (base, { isSelected }) => ({
        ...base,
        backgroundColor: isSelected ? themeMap.hoverBg : themeMap.htmlBg,
        '&:hover': {
          backgroundColor: themeMap.hoverBg,
          color: themeMap.article.title,
          cursor: 'pointer',
        },
        border: '1px solid',
        borderColor: isSelected ? themeMap.divider : 'transparent',
        color: isSelected ? themeMap.article.title : themeMap.article.digest,
      }),
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
    <Wrapper $testid={testid} className={className} {...restProps}>
      {!creatable ? (
        <ReactSelect
          {...baseProps}
          isMulti={isMulti}
          components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
        />
      ) : (
        <CreatableReactSelect {...baseProps} onCreateOption={onCreateOption} />
      )}
    </Wrapper>
  )
}

export default memo(Select)
