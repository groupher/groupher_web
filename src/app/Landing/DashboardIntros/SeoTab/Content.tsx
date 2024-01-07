import { FC } from 'react'

import { Brick } from '@/widgets/Common'
import {
  Wrapper,
  OgPanel,
  TwPanel,
  EditBox,
  EditIcon,
  Title,
  Desc,
} from '../../styles/dashboard_intros/seo_tab/content'

const Content: FC = () => {
  return (
    <Wrapper>
      <OgPanel>
        <Title>ogUrl</Title>
        <Desc>https://motuojie.com</Desc>
        <Title>ogTitle</Title>
        <Desc>Motuojie - (摩面)</Desc>
        <Title>ogDescription</Title>
        <Desc>发现复古摩托车的魅力...</Desc>
        <Brick $width={100} top={150} left={10} $opacity={0.12} />
        <Brick $width={50} top={166} left={10} $opacity={0.08} />
      </OgPanel>
      <EditBox>
        <EditIcon />
      </EditBox>
      <TwPanel>
        <Title>twUrl</Title>
        <Desc>https://motuojie.com</Desc>
        <Title>twTitle</Title>
        <Desc>Motuojie - (摩面)</Desc>
        <Title>twDescription</Title>
        <Desc>发现复古摩托车的魅力...</Desc>
        <Brick $width={100} top={150} left={68} $opacity={0.12} />
        <Brick $width={50} top={166} left={68} $opacity={0.06} />
      </TwPanel>
    </Wrapper>
  )
}

export default Content
