import { LineDivider } from '@/widgets/Common'

import useTheme from '@/hooks/useTheme'
import THEME from '@/constant/theme'

import { Wrapper, Section, Title, SunIcon, MoonIcon } from '../styles/section_label/theme_select'

const ThemeSelect = () => {
  const { curTheme, changeTheme } = useTheme()

  return (
    <Wrapper>
      <Section onClick={() => changeTheme(THEME.DAY)} $active={curTheme === THEME.DAY}>
        <SunIcon />
        <Title>浅色主题</Title>
      </Section>

      <LineDivider left={10} right={10} height={10} />
      <Section onClick={() => changeTheme(THEME.NIGHT)} $active={curTheme === THEME.NIGHT}>
        <MoonIcon />
        <Title>暗色主题</Title>
      </Section>
    </Wrapper>
  )
}

export default ThemeSelect
