/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react'

import Button from '@/widgets/Buttons/Button'

import {
  Wrapper,
  Preview,
  PreviewButtonsWrapper,
  Head,
  UpdateHint,
  Title,
  ButtonsWrapper,
  AddIcon,
  EditIcon,
} from '../../../styles/cms/docs/tree/actions'

const Actions: FC = () => {
  return (
    <Wrapper>
      <Preview>
        <Head>
          <Title>Mac 下怎样安全使用。</Title>
          <UpdateHint>1 天前更新</UpdateHint>
        </Head>
        <PreviewButtonsWrapper>
          <Button size="small" ghost noBorder left={-10}>
            <EditIcon />
            编辑文档
          </Button>

          <Button size="small" ghost noBorder>
            <EditIcon />
            添加 Slug
          </Button>
        </PreviewButtonsWrapper>
      </Preview>
      <ButtonsWrapper>
        <Button size="small" ghost>
          <AddIcon />
          置顶链接&nbsp;
        </Button>
        <Button size="small" ghost>
          <AddIcon />
          节点&nbsp;
        </Button>
        <Button size="small" ghost>
          <AddIcon />
          目录&nbsp;
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  )
}

export default Actions
