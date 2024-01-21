import { FC } from 'react'

import {
  Wrapper,
  Links,
  LinkName,
  Title,
  Icon,
} from '../../styles/dashboard_intros/import_tab/header_card'

const HeaderCard: FC = () => {
  return (
    <Wrapper>
      <Icon.GITHUB />
      <Icon.EMAIL />
      <Icon.Markdown />
      <Icon.GITHUB />
      <Icon.GITHUB />
    </Wrapper>
  )
}

export default HeaderCard
