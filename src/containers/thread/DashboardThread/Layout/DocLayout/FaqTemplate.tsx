import { type FC, memo } from 'react'

import type { TDocFAQLayout } from '@/spec'
import { DOC_FAQ_LAYOUT } from '@/const/layout'

import { Br, Row } from '@/widgets/Common'

import {
  Bar,
  CheckIcon,
  CollapseContent,
  Box3,
  FAQTitle,
  FlatLayoutWrapper,
  FlatLists,
  CollapseLayoutWrapper,
} from '../../styles/layout/doc_layout/faq_template'

type TProps = {
  layout: TDocFAQLayout
}

const FaqTemplate: FC<TProps> = ({ layout }) => {
  if (layout === DOC_FAQ_LAYOUT.COLLAPSE) {
    return (
      <CollapseLayoutWrapper>
        <FAQTitle>常见问题</FAQTitle>
        <Br bottom={15} />
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={85} thin />
        <Br bottom={15} />
        <Bar long={50} thin bold />
        <Br bottom={10} />
        <Bar long={60} thin />
        <Br bottom={15} />
        <Bar long={50} thin bold />
        <Br bottom={10} />
        <Bar long={60} thin />
      </CollapseLayoutWrapper>
    )
  }

  return (
    <FlatLayoutWrapper>
      <FAQTitle>常见问题</FAQTitle>
      <FlatLists>
        <Box3>
          <Row>
            <CheckIcon />
            <Bar long={60} thin bold />
          </Row>
          <CollapseContent>
            <Br bottom={10} />
            <Bar long={50} thin />
            <Br bottom={6} />
            <Bar long={40} thin />
          </CollapseContent>
        </Box3>
        <Box3>
          <Row>
            <CheckIcon />
            <Bar long={60} thin bold />
          </Row>
          <CollapseContent>
            <Br bottom={10} />
            <Bar long={50} thin />
            <Br bottom={6} />
            <Bar long={40} thin />
          </CollapseContent>
        </Box3>
        <Box3>
          <Row>
            <CheckIcon />
            <Bar long={60} thin bold />
          </Row>
          <CollapseContent>
            <Br bottom={10} />
            <Bar long={50} thin />
            <Br bottom={6} />
            <Bar long={40} thin />
          </CollapseContent>
        </Box3>
        <Box3>
          <Row>
            <CheckIcon />
            <Bar long={60} thin bold />
          </Row>
          <CollapseContent>
            <Br bottom={10} />
            <Bar long={50} thin />
            <Br bottom={6} />
            <Bar long={40} thin />
          </CollapseContent>
        </Box3>
        <Box3>
          <Row>
            <CheckIcon />
            <Bar long={60} thin bold />
          </Row>
          <CollapseContent>
            <Br bottom={10} />
            <Bar long={50} thin />
            <Br bottom={6} />
            <Bar long={40} thin />
          </CollapseContent>
        </Box3>
      </FlatLists>
    </FlatLayoutWrapper>
  )
}

export default memo(FaqTemplate)
