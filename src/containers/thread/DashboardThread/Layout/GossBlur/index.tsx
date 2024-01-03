import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useTheme from '@/hooks/useTheme'
import THEME from '@/constant/theme'

import GossBlurDay from './GossBlurDay'
import GossBlurNight from './GossBlurNight'

const GossBlur: FC = () => {
  const { curTheme } = useTheme()

  return curTheme === THEME.DAY ? <GossBlurDay /> : <GossBlurNight />
}

export default observer(GossBlur)
