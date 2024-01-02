import { FC, memo, ReactNode } from 'react'

import { SpaceGrow } from '@/widgets/Common'

import ThemeSelect from './ThemeSelect'
import { Wrapper, Header, Title, Desc } from '../styles/section_label'

type TProps = {
  title: string
  desc?: ReactNode
  addon?: ReactNode
  width?: string
  withThemeSelect?: boolean
}

const SectionLabel: FC<TProps> = ({
  title,
  desc = null,
  addon = null,
  width = '100%',
  withThemeSelect = false,
}) => {
  return (
    <Wrapper width={width}>
      <Header>
        <Title noDesc={desc === null}>
          {title}{' '}
          {withThemeSelect && (
            <>
              <SpaceGrow /> <ThemeSelect />
            </>
          )}
        </Title>
        <SpaceGrow />
        {addon}
      </Header>
      {desc && <Desc>{desc}</Desc>}
    </Wrapper>
  )
}

export default memo(SectionLabel)
