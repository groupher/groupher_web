import { FC } from 'react'

import Button from '@/widgets/Buttons/Button'
import { Wrapper, Logo, Title, Desc, Highlight, Buttons } from '../styles/footer'

const Footer: FC = () => {
  return (
    <Wrapper>
      <Logo src="groupher-alpha.png" />

      <Title>节省您的宝贵时间</Title>
      <Desc>
        你只需专注于产品的<Highlight>核心功能</Highlight>，将周边的「<Highlight>杂活儿</Highlight>
        」交给 Groupher
      </Desc>
      <Buttons>
        <Button size="medium">创建我的社区</Button>
        <Button size="medium" ghost>
          预约演示
        </Button>
      </Buttons>
    </Wrapper>
  )
}

export default Footer
