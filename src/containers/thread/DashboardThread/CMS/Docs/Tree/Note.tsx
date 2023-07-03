/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react'

import { Wrapper, Title, Ul, Li } from '../../../styles/cms/docs/tree/note'

const Note: FC = () => {
  return (
    <Wrapper>
      <Title>操作提示</Title>
      <Ul>
        <Li>可通过拖拽改变文档或目录顺序。</Li>
        <Li>可通过键盘导航到任意文档。</Li>
        <Li>可选中某文档/目录后后在其下方创建新文档/目录。</Li>
        <Li>可通过键盘的删除键移除文档。</Li>
        <Li>删除目录会循环删除该目录下所有节点。</Li>
        <Li>可通过 "空格" 键打开/关闭目录。</Li>
      </Ul>
    </Wrapper>
  )
}

export default Note
