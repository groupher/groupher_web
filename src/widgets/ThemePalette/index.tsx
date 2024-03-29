'use client'

/*
 * make children compoent cound reach the props.theme object
 * because mobx's observer mechanism, we should manually watch the theme
 * otherwhise the render will not be triggled
 */
import { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from 'styled-components'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import useThemeData from '@/hooks/useThemeData'

import ThirdPartyOverWrite from './ThirdPartyOverWrite'
import ScrollBarStyle from './ScrollBarStyle'
import GlobalStyle from './GlobalStyle'
// import { CodeSyxHighlight } from './dynamic'

type TProps = {
  children: ReactNode
}

const ThemePalette: FC<TProps> = ({ children }) => {
  const themeData = useThemeData()
  const primaryColor = usePrimaryColor()
  // see https://css-tricks.com/meta-theme-color-and-trickery/
  // theme seems conflict with manifest

  return (
    <ThemeProvider theme={themeData}>
      <GlobalStyle $color={primaryColor} />
      {children}
      <ThirdPartyOverWrite />
      {/* <CodeSyxHighlight /> */}
      <ScrollBarStyle />
    </ThemeProvider>
  )
}

export default observer(ThemePalette)

// about meta theme-color
// see: https://stackoverflow.com/questions/26960703/how-to-change-the-color-of-header-bar-and-address-bar-in-newest-chrome-version-o
