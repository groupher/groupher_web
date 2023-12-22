import { FC } from 'react'

import Header from './Header'
import {
  Wrapper,
  BlocksWrapper,
  Block,
  Line,
  Column,
  ICON,
  Title,
} from '../../styles/feature_wall/security/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper>
      <Line top={40} left={10} $hovering={hovering} />
      <Line top={72} right={30} width="100px" $hovering={hovering} />
      <Line top={85} right={10} $hovering={hovering} />
      <Line top={120} right={30} width="220px" $hovering={hovering} />

      <Column top={12} left={30} height="168px" $hovering={hovering} />
      <Column top={12} left={60} height="108px" $hovering={hovering} />
      <Column top={30} left={100} height="108px" $hovering={hovering} />
      <Column top={30} right={80} height="148px" $hovering={hovering} />
      <Column top={30} right={30} height="108px" $hovering={hovering} />

      <Header hovering={hovering} />

      <BlocksWrapper top={hovering ? 20 : 5}>
        <Block left={hovering ? 6 : 15}>
          <ICON.Lock />
          <Title>https加密</Title>
        </Block>
        <Block>
          <ICON.Setting />
          <Title>外观自定义</Title>
        </Block>
        <Block left={hovering ? 10 : 0}>
          <ICON.Upload />
          <Title>导入导出</Title>
        </Block>
        <Block>
          <ICON.Hash />
          <Title>用户标签</Title>
        </Block>
        <Block>
          <ICON.Search />
          <Title>SEO</Title>
        </Block>
        <Block left={hovering ? 35 : 25} $opacity={0.8}>
          <ICON.Auth />
          <Title>灵活权限</Title>
        </Block>
        <Block $opacity={0.8}>
          <ICON.Cloud />
          <Title>私有部署</Title>
        </Block>
      </BlocksWrapper>
    </Wrapper>
  )
}

export default Panel
