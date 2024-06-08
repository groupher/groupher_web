import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useTheme from '@/hooks/useTheme'
import THEME from '@/const/theme'

import GossBlurDay from './GossBlurDay'
import GossBlurNight from './GossBlurNight'

const GossBlur: FC = () => {
  const { theme } = useTheme()

  return theme === THEME.DAY ? <GossBlurDay /> : <GossBlurNight />
}

export default observer(GossBlur)
