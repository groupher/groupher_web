import { FC } from 'react'

import {
  Wrapper,
  EditLabel,
  ClipIcon,
  Left,
  Right,
  Item,
  Label,
  ColorDot,
  Value,
  HashTagIcon,
  OptionArrowIcon,
  Slash,
  TagDot,
} from '../../styles/dashboard_intros/tags_tab/footer'

const Footer: FC = () => {
  return (
    <Wrapper>
      <EditLabel top={70} left={160}>
        edit
      </EditLabel>
      <ClipIcon />
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
          <Label>URL(slug)</Label>
          <Value>showcase</Value>
        </Item>
      </Left>

      <Right>
        <Item>
          <Label>内容布局</Label>
          <Value>图文瀑布流</Value>
          <OptionArrowIcon />
        </Item>
        <Item>
          <Label>标签简介</Label>
          <Value>这里搜集各位亲们的日常使用分享、实用技巧以及攻略等，Have fun !</Value>
        </Item>
      </Right>
    </Wrapper>
  )
}

export default Footer
