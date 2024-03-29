/*
 * ThemeSwitch
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TSpace } from '@/spec'
import useTheme from '@/hooks/useTheme'

import { buildLog } from '@/logger'
import THEME from '@/constant/theme'

import { Wrapper, Button, SunIcon, MoonIcon } from './styles'

const _log = buildLog('c:ThemeSwitch:index')

type TProps = {
  testid?: string
} & TSpace

const ThemeSwitch: FC<TProps> = ({ testid = 'theme-switch', ...restProps }) => {
  const { curTheme, switchTheme } = useTheme()

  return (
    <Wrapper $testid={testid} {...restProps}>
      <Button
        className="theme-toggle"
        id="theme-toggle"
        title="Toggles light & dark"
        aria-label="auto"
        aria-live="polite"
        onClick={() => switchTheme()}
      >
        {curTheme === THEME.DAY ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Wrapper>
  )
}

export default observer(ThemeSwitch)
