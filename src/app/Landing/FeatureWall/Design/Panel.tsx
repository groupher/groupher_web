import { FC } from 'react'

import {
  Wrapper,
  BlocksWrapper,
  Block,
  Line,
  Column,
  ICON,
  Title,
} from '../../styles/feature_wall/design/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper>
      <Line top={30} left={10} $hovering={hovering} />
      <Line top={72} right={30} width="100px" $hovering={hovering} />
      <Line top={85} right={10} $hovering={hovering} />
      <Line top={120} right={30} width="220px" $hovering={hovering} />

      <Column top={12} left={30} height="168px" $hovering={hovering} />
      <Column top={12} left={60} height="108px" $hovering={hovering} />
      <Column top={30} left={100} height="108px" $hovering={hovering} />
      <Column top={30} right={80} height="148px" $hovering={hovering} />
      <Column top={30} right={30} height="108px" $hovering={hovering} />

      <BlocksWrapper>
        <Block left={hovering ? 6 : 15}>
          <ICON.Lock />
          <Title>https加密</Title>
        </Block>
        <Block>
          <ICON.Global />
          <Title>自定义域名</Title>
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
