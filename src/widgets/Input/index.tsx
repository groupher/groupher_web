/*
 *
 * Input
 *
 */

import { type FC, useCallback, memo } from 'react'
import { pickBy } from 'ramda'

import { nilOrEmpty } from '@/validator'

import Textarea from './Textarea'
import { Wrapper, PrefixWrapper, SuffixWrapper, Icon, InputWrapper } from './styles'

type TProps = {
  testid?: string
  behavior?: 'default' | 'textarea'
  placeholder?: string
  value?: string | null
  prefixIcon?: string | null
  prefixActive?: boolean
  suffixIcon?: string | null
  suffixActive?: boolean
  disabled?: boolean
  autoFocus?: boolean
  disableEnter?: boolean

  onFocus?: (e) => void
  onBlur?: (e) => void
  onChange?: (e) => void
  onEnter?: () => void
}

const Input: FC<TProps> = ({
  behavior = 'default',
  onChange = null,
  onEnter = null,
  onFocus = null,
  onBlur = null,
  prefixIcon = null,
  prefixActive = false,
  suffixIcon = null,
  suffixActive = false,
  testid = 'input',
  autoFocus = false,
  disableEnter = false,
  ...restProps
}) => {
  const handleOnChange = useCallback((e) => onChange?.(e), [onChange])
  const handleOnKeydown = useCallback(
    (e) => {
      if (e.key === 'Enter' && onEnter) {
        onEnter()
      }
    },
    [onEnter],
  )

  const handleOnFocus = useCallback((e) => onFocus?.(e), [onFocus])
  const handleOnBlur = useCallback((e) => onBlur?.(e), [onBlur])
  const validProps = pickBy((v) => v !== null, restProps)

  return behavior === 'default' ? (
    <Wrapper $testid={testid}>
      <PrefixWrapper show={!nilOrEmpty(prefixIcon)}>
        {prefixIcon && <Icon src={prefixIcon} active={prefixActive} />}
      </PrefixWrapper>
      <InputWrapper
        onChange={handleOnChange}
        onKeyDown={handleOnKeydown}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        spellCheck="false"
        // prefix={false}
        $hasPrefix={!nilOrEmpty(prefixIcon)}
        $hasSuffix={!nilOrEmpty(suffixIcon)}
        autoFocus={autoFocus}
        // @ts-ignore
        {...validProps}
      />
      <SuffixWrapper show={!nilOrEmpty(suffixIcon)}>
        {suffixIcon && <Icon src={suffixIcon} active={suffixActive} />}
      </SuffixWrapper>
    </Wrapper>
  ) : (
    <Textarea
      testid={testid}
      onChange={onChange}
      autoFocus={autoFocus}
      disableEnter={disableEnter}
      {...restProps}
    />
  )
}

export default memo(Input)
