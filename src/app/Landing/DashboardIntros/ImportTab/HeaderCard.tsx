import { FC } from 'react'

import {
  Wrapper,
  Card,
  Title,
  Icon,
  ImgIcon,
} from '../../styles/dashboard_intros/import_tab/header_card'

const HeaderCard: FC = () => {
  return (
    <Wrapper>
      <Card>
        <Icon.GITHUB />
        <Title>Github</Title>
      </Card>
      <Card>
        <ImgIcon src="landing/products/linear.png" />
        <Title>Linear</Title>
      </Card>
      <Card>
        <Icon.Markdown />
        <Title>MD 文件</Title>
      </Card>
      <Card>
        <Icon.GITHUB />
        <Title>CVS 文件</Title>
      </Card>
    </Wrapper>
  )
}

export default HeaderCard
