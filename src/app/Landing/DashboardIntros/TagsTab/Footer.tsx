import { FC } from 'react'

import {
  Wrapper,
  Left,
  Right,
  Item,
  Label,
  ColorDot,
  Value,
  HashTagIcon,
  Slash,
  TagDot,
} from '../../styles/dashboard_intros/tags_tab/footer'

const Footer: FC = () => {
  return (
    <Wrapper>
      <Left>
        <Item>
          <Label>标签颜色</Label>
          <ColorDot />
        </Item>
        <Item>
          <Label>标签样式</Label>
          <HashTagIcon />
          <Slash>/</Slash>
          <TagDot />
        </Item>
        <Item>
          <Label>标签名称</Label>
          <Value>使用分享</Value>
        </Item>
        <Item>
          <Label>Slug</Label>
          <Value>showcase</Value>
        </Item>
      </Left>

      <Right>
        <Item>
          <Label>内容布局</Label>
          <Value>图文瀑布流</Value>
        </Item>
        <Item>
          <Label>标签简介</Label>
          <Value>这里搜集各位亲们的日常使用分享、实用技巧以及攻略等，Have fun 🫰!</Value>
        </Item>
      </Right>
    </Wrapper>
  )
}

export default Footer
