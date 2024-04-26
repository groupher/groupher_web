import { FC } from 'react'

import { SpaceGrow, SexyDivider } from '@/widgets/Common'

import { Wrapper, AppStoreBar, MenuBar, ICON, Info, Platform, Title } from './styles/panel'

const Panel: FC = () => {
  return (
    <Wrapper>
      <AppStoreBar>
        <ICON.GooglePlay />
      </AppStoreBar>

      <AppStoreBar>
        <ICON.AppStore />
      </AppStoreBar>

      <SexyDivider top={8} bottom={6} />

      <MenuBar>
        <ICON.ChromeWebStore />
        <Info>
          <Platform>Chrome 应用商店</Platform>
          <Title>Groupher</Title>
        </Info>
        <SpaceGrow />
        <ICON.Link />
      </MenuBar>

      <MenuBar>
        <ICON.Firefox />
        <Info>
          <Platform>火狐插件市场</Platform>
          <Title>Groupher</Title>
        </Info>
        <SpaceGrow />
        <ICON.Link />
      </MenuBar>

      <MenuBar>
        <ICON.Github />
        <Info>
          <Platform>Github</Platform>
          <Title>Groupher</Title>
        </Info>
        <SpaceGrow />
        <ICON.Link />
      </MenuBar>
    </Wrapper>
  )
}

export default Panel
