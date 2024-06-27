import type { FC } from 'react'

import { Brick, Br } from '~/widgets/Common'
import {
  Wrapper,
  OgPanel,
  TwPanel,
  EditBox,
  EditIcon,
  Title,
  Logo,
  Desc,
  LinkDesc,
  IconBox,
  Icon,
} from '../../styles/dashboard_intros/links_tab/content'

const Content: FC = () => {
  return (
    <Wrapper>
      <OgPanel>
        <Title>社区图标</Title>
        <Logo />
        <Title>社区名称</Title>
        <Desc>Tiki-taka</Desc>
        <Title>社区简介</Title>
        <Desc>Visca Barca Visca Catalunya!</Desc>
        <Title>社交媒体</Title>

        <IconBox top={202} left={6}>
          <Icon.Wechat />
        </IconBox>
        <Brick $width={76} top={210} left={40} $opacity={0.08} />

        <IconBox top={225} left={6}>
          <Icon.Twitter />
        </IconBox>
        <Brick $width={50} top={234} left={40} $opacity={0.08} />

        {/*

        <IconBox top={178} left={6}>
          <ICON.Zhihu />
        </IconBox>
        <Brick $width={50} top={186} left={40} $opacity={0.08} /> */}

        {/* <Brick $width={15} top={215} left={12} $opacity={0.12} />
        <Brick $width={40} top={215} left={40} $opacity={0.06} />

        <Brick $width={15} top={235} left={12} $opacity={0.12} />
        <Brick $width={40} top={235} left={40} $opacity={0.06} /> */}
      </OgPanel>
      <EditBox>
        <EditIcon />
      </EditBox>
      <TwPanel>
        <Title>页眉链接</Title>
        <Br top={8} />
        <LinkDesc>游乐场</LinkDesc>
        <LinkDesc>价格</LinkDesc>
        <Brick $width={50} top={34} right={46} $opacity={0.08} />
        <Brick $width={50} top={56} right={46} $opacity={0.08} />

        <Br top={20} />
        <Title>页脚链接</Title>
        <Br top={8} />
        <LinkDesc>梅西</LinkDesc>
        <LinkDesc>哈维</LinkDesc>
        <LinkDesc>小白</LinkDesc>
        <LinkDesc>布教授</LinkDesc>

        <Brick $width={50} top={124} right={46} $opacity={0.08} />
        <Brick $width={50} top={145} right={46} $opacity={0.08} />

        <Brick $width={50} top={168} right={46} $opacity={0.08} />
        <Brick $width={50} top={188} right={46} $opacity={0.08} />

        <Brick $width={30} top={220} left={68} $opacity={0.12} />
        <Brick $width={50} top={220} right={48} $opacity={0.06} />

        <Brick $width={30} top={237} left={68} $opacity={0.08} />
        <Brick $width={50} top={237} right={48} $opacity={0.04} />
      </TwPanel>
    </Wrapper>
  )
}

export default Content
