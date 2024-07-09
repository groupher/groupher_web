/*
 *
 * SettingMenu
 *
 */

import { type FC, memo } from 'react'

import { Wrapper, Option, ActiveDot, Title, Desc } from './styles'

type TProps = {
  testid?: string
  width?: number | null
  activeKey?: string
  options: {
    title: string
    desc?: string
    key: string
  }[]
  onChange?: (type: string) => void
}

const SettingMenu: FC<TProps> = ({
  testid = 'setting-menu',
  options,
  width = 220,
  activeKey = null,
  onChange = console.log,
}) => {
  return (
    <Wrapper $testid={testid} width={width}>
      {options.map((option) => (
        <Option
          key={option.key}
          $active={activeKey === option.key}
          onClick={() => onChange(option.key)}
        >
          {activeKey === option.key && <ActiveDot />}
          <Title>{option.title}</Title>
          <Desc>{option.desc}</Desc>
        </Option>
      ))}
    </Wrapper>
  )
}

export default memo(SettingMenu)
