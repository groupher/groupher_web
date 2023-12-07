import { FC } from 'react'

import {
  Wrapper,
  PinnedItem,
  BookIcon,
  QuestionIcon,
  Bar,
} from '../../../styles/articles_intro_tabs/help_feat/help_demo/dir_tree'

const DirTree: FC = () => {
  return (
    <Wrapper>
      <PinnedItem>
        <BookIcon />
        <Bar width={48} height={8} opacity={0.3} left={6} />
      </PinnedItem>
      <PinnedItem>
        <QuestionIcon />
        <Bar width={52} height={8} opacity={0.4} left={8} />
      </PinnedItem>

      <Bar width={45} height={5} opacity={0.5} left={5} top={28} />
      <Bar width={40} height={4} opacity={0.2} left={5} top={10} />
      <Bar width={55} height={4} opacity={0.2} left={5} top={10} />
      <Bar width={62} height={4} opacity={0.2} left={5} top={10} />

      <Bar width={27} height={5} opacity={0.5} left={5} top={20} />
      <Bar width={45} height={4} opacity={0.2} left={5} top={10} />
      <Bar width={50} height={4} opacity={0.2} left={5} top={10} />
      <Bar width={40} height={4} opacity={0.2} left={5} top={10} />

      <Bar width={32} height={5} opacity={0.5} left={5} top={20} />
      <Bar width={60} height={4} opacity={0.2} left={5} top={10} />
      <Bar width={40} height={4} opacity={0.2} left={5} top={10} />

      <Bar width={40} height={5} opacity={0.5} left={5} top={20} />
      <Bar width={50} height={4} opacity={0.2} left={5} top={10} />
      <Bar width={70} height={4} opacity={0.2} left={5} top={10} />
      <Bar width={30} height={4} opacity={0.2} left={5} top={10} />
      <Bar width={20} height={4} opacity={0.2} left={5} top={10} />
    </Wrapper>
  )
}

export default DirTree
