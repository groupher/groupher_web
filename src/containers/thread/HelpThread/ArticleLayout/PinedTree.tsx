import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'

import {
  Wrapper,
  Item,
  Cover,
  IconBox,
  CategoryCover,
  BlocksIcon,
  QuestionIcon,
  GithubIcon,
  Title,
} from '../styles/article_layout/pined_tree'
import { back2Layout, gotoFAQDetailLayout } from '../logic'

const PinedTree: FC = () => {
  return (
    <Wrapper>
      <Item onClick={() => back2Layout()}>
        <IconBox>
          <CategoryCover color={COLOR_NAME.BLACK} />
          <BlocksIcon />
        </IconBox>
        <Title color={COLOR_NAME.BLACK}>全部文档</Title>
      </Item>
      <Item onClick={() => gotoFAQDetailLayout()}>
        <IconBox>
          <Cover color={COLOR_NAME.PURPLE} />
          <QuestionIcon />
        </IconBox>
        <Title color={COLOR_NAME.PURPLE}>常见问题</Title>
      </Item>
      <Item onClick={() => gotoFAQDetailLayout()}>
        <IconBox>
          <Cover color={COLOR_NAME.BLACK} />
          <GithubIcon />
        </IconBox>
        <Title color={COLOR_NAME.BLACK}>Github</Title>
      </Item>
    </Wrapper>
  )
}

export default PinedTree
