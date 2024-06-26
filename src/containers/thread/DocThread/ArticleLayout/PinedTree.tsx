import { COLOR_NAME } from '@/const/colors'

import useLogic from '../useLogic'
import {
  Wrapper,
  Item,
  Cover,
  IconBox,
  CategoryCover,
  BookIcon,
  QuestionIcon,
  GithubIcon,
  Title,
} from '../styles/article_layout/pined_tree'

export default () => {
  const { back2Layout, gotoFAQDetailLayout } = useLogic()
  return (
    <Wrapper>
      <Item onClick={() => back2Layout()}>
        <IconBox>
          <CategoryCover color={COLOR_NAME.BLACK} />
          <BookIcon />
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
