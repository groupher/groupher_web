import { FC, useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'

import type { TActive } from '@/spec'

import { FEAT_TYPE } from '../../constant'
import BgDots from '../BgDots'

import Banner from './Banner'
import KanbanItem from './KanbanItem'

import {
  Wrapper,
  ImageWrapper,
  BoardsWrapper,
  Board,
  ColorBlock,
  ColorBlockHolder,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/feature_wall/kanban_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Wrapper>
      <BgDots $active={$active} featType={FEAT_TYPE.KANBAN} />
      <ImageWrapper>
        <Banner />
        <BoardsWrapper>
          <Board>
            <KanbanItem count={17} />
            <KanbanItem opacity={0.85} count={4} width={60} />
            <KanbanItem opacity={0.75} count={6} width={40} />
            <KanbanItem opacity={0.65} count={13} width={70} />
            <KanbanItem opacity={0.55} count={2} width={90} />
            <KanbanItem opacity={0.45} />
          </Board>
          <Board>
            <KanbanItem count={21} width={60} />
            <KanbanItem opacity={0.85} count={11} width={60} />
            <KanbanItem opacity={0.75} count={16} width={80} />
            <KanbanItem opacity={0.65} count={21} width={110} />
            <KanbanItem opacity={0.55} count={9} width={40} />
            <KanbanItem opacity={0.45} count={15} width={60} />
          </Board>
          <Board shadow>
            <KanbanItem count={72} width={68} />
            <KanbanItem opacity={0.95} count={112} width={60} />
            <KanbanItem opacity={0.85} count={41} width={100} />
            <KanbanItem opacity={0.75} count={87} width={60} />
            <KanbanItem opacity={0.65} count={62} width={40} />
            <KanbanItem opacity={0.6} count={21} width={60} />
          </Board>
        </BoardsWrapper>
      </ImageWrapper>

      {!loaded && <ColorBlockHolder />}

      {loaded && (
        <Parallax speed={15} rotate={[-2, 6]} translateY={[10, -10]}>
          <ColorBlock $active={$active} />
        </Parallax>
      )}

      <Parallax speed={15} rotate={[-4, 14]} translateY={[10, -10]} opacity={[1, 0.5]}>
        <IconsWrapper>
          <Icon1 />
          <Icon2 />
          <Icon3 />
        </IconsWrapper>
      </Parallax>
    </Wrapper>
  )
}

export default IntroImage
