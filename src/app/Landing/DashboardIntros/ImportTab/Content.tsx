import type { FC } from 'react'

import { Brick } from '~/widgets/Common'

import { Wrapper, Header, Logo, Title } from '../../styles/dashboard_intros/import_tab/content'

const Content: FC = () => {
  return (
    <Wrapper>
      <Header>
        <Logo src="groupher-alpha.png" />
        <Title>Groupher</Title>
      </Header>

      <Brick $width={100} $height={6} $opacity={0.18} top={60} left={30} />
      <Brick $width={120} $height={6} $opacity={0.16} top={78} left={30} />
      <Brick $width={90} $height={6} $opacity={0.13} top={96} left={30} />
      <Brick $width={80} $height={6} $opacity={0.1} top={114} left={30} />
      <Brick $width={100} $height={6} $opacity={0.06} top={132} left={30} />
    </Wrapper>
  )
}

export default Content
