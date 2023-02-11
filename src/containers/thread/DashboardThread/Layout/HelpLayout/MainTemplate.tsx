import { FC, memo } from 'react'

import type { THelpLayout } from '@/spec'
import { HELP_LAYOUT } from '@/constant/layout'
import { COLOR_NAME } from '@/constant/colors'

import { Br, Row } from '@/widgets/Common'

import {
  Bar,
  Box,
  Box3,
  ListsLayoutWrapper,
  BlocksLayoutWrapper,
  IconWrapper,
  ToolIcon,
  ListContent,
} from '../../styles/layout/help_layout/main_template'

type TProps = {
  layout: THelpLayout
}

const MainTemplate: FC<TProps> = ({ layout }) => {
  if (layout === HELP_LAYOUT.LISTS) {
    return (
      <ListsLayoutWrapper>
        <Box>
          <Row>
            <IconWrapper color={COLOR_NAME.BLACK}>
              <ToolIcon color={COLOR_NAME.BLACK} />
            </IconWrapper>
            <ListContent>
              <Bar long={60} thin bold />
              <Br bottom={8} />
              <Bar long={100} thin />
              <Br bottom={10} />
              <Bar long={30} thin />
            </ListContent>
          </Row>
          <Br bottom={16} />
          <Row>
            <IconWrapper color={COLOR_NAME.RED}>
              <ToolIcon color={COLOR_NAME.RED} />
            </IconWrapper>
            <ListContent>
              <Bar long={60} thin bold />
              <Br bottom={8} />
              <Bar long={100} thin />
              <Br bottom={10} />
              <Bar long={30} thin />
            </ListContent>
          </Row>
          <Br bottom={16} />
          <Row>
            <IconWrapper color={COLOR_NAME.BLUE}>
              <ToolIcon color={COLOR_NAME.BLUE} />
            </IconWrapper>
            <ListContent>
              <Bar long={60} thin bold />
              <Br bottom={8} />
              <Bar long={100} thin />
              <Br bottom={10} />
              <Bar long={30} thin />
            </ListContent>
          </Row>
        </Box>
      </ListsLayoutWrapper>
    )
  }

  return (
    <BlocksLayoutWrapper>
      <Box3>
        <IconWrapper color={COLOR_NAME.BLACK}>
          <ToolIcon color={COLOR_NAME.BLACK} />
        </IconWrapper>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
      <Box3>
        <IconWrapper color={COLOR_NAME.RED}>
          <ToolIcon color={COLOR_NAME.RED} />
        </IconWrapper>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
      <Box3>
        <IconWrapper color={COLOR_NAME.GREEN}>
          <ToolIcon color={COLOR_NAME.GREEN} />
        </IconWrapper>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
      <Box3>
        <IconWrapper color={COLOR_NAME.BLUE}>
          <ToolIcon color={COLOR_NAME.BLUE} />
        </IconWrapper>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
      <Box3>
        <IconWrapper color={COLOR_NAME.PURPLE}>
          <ToolIcon color={COLOR_NAME.PURPLE} />
        </IconWrapper>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
    </BlocksLayoutWrapper>
  )
}

export default memo(MainTemplate)
