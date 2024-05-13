import { LineDivider } from '@/widgets/Common'

import useTheme from '@/hooks/useTheme'
import THEME from '@/constant/theme'

import { Wrapper, Section, Title, SunIcon, MoonIcon } from '../styles/section_label/theme_select'

const ThemeSelect = () => {
  const { theme, change } = useTheme()

  return (
    <Wrapper>
      <Section onClick={() => change(THEME.DAY)} $active={theme === THEME.DAY}>
        <SunIcon />
        <Title>浅色主题</Title>
      </Section>

      <LineDivider left={10} right={10} height={10} />
      <Section onClick={() => change(THEME.NIGHT)} $active={theme === THEME.NIGHT}>
        <MoonIcon />
        <Title>暗色主题</Title>
      </Section>
    </Wrapper>
  )
}

export default ThemeSelect
