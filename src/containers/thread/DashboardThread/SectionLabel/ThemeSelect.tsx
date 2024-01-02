import { LineDivider } from '@/widgets/Common'

import { Wrapper, Section, Title, SunIcon, MoonIcon } from '../styles/section_label/theme_select'

const ThemeSelect = () => {
  return (
    <Wrapper>
      <Section $active>
        <SunIcon />
        <Title>浅色主题</Title>
      </Section>

      <LineDivider left={10} right={10} height={10} />
      <Section>
        <MoonIcon />
        <Title>暗色主题</Title>
      </Section>
    </Wrapper>
  )
}

export default ThemeSelect
