import { FC, memo } from 'react'

import type { THelpLayout, TFileTreeDirection } from '@/spec'

import { HELP_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant'
import { callDashboardDesc } from '@/utils/signal'

import { Br, Space, Inline } from '@/widgets/Common'
import ArrowButton from '@/widgets/Buttons/ArrowButton'
import CheckLabel from '@/widgets/CheckLabel'
import Radio from '@/widgets/Switcher/Radio'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import {
  Wrapper,
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
  Bar,
  Box,
  Box3,
  Main,
  ListsWrapper,
  FAQWrapper,
  FAQFullWrapper,
  FileTreeSettings,
} from '../styles/ui/help_layout'
import { edit } from '../logic'

type TProps = {
  layout: THelpLayout
  isTouched: boolean
  saving: boolean
  fileTreeDirection: TFileTreeDirection
  isFileTreeDirectionTouched: boolean
}

const HelpLayout: FC<TProps> = ({
  layout,
  isTouched,
  saving,
  isFileTreeDirectionTouched,
  fileTreeDirection,
}) => {
  return (
    <Wrapper>
      <SectionLabel
        title="帮助台布局"
        desc={
          <>
            帮助台的布局，请根据你的文档内容多少自由选择。
            <Inline>
              <ArrowButton
                onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}
                size="tiny"
                arrowStyle="simple"
              >
                查看示例
              </ArrowButton>
            </Inline>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(HELP_LAYOUT.FULL, 'helpLayout')}>
          <Block $active={layout === HELP_LAYOUT.FULL}>
            <Br bottom={14} />
            <Main>
              <ListsWrapper withDivider>
                <Box>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box>
                <Box>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={20} />
                </Box>
                <Box>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box>
                <Box>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box>
              </ListsWrapper>
              <FAQWrapper>
                <Bar thin long={50} bold />
                <Br bottom={15} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={85} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={6} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
              </FAQWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === HELP_LAYOUT.FULL}>
            <CheckLabel
              title="双栏模式"
              $active={layout === HELP_LAYOUT.FULL}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>

        <Space right={40} />
        <Layout onClick={() => edit(HELP_LAYOUT.HELPCENTER, 'helpLayout')}>
          <Block $active={layout === HELP_LAYOUT.HELPCENTER}>
            <Br bottom={14} />
            <Main>
              <ListsWrapper>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box3>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box3>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={20} />
                </Box3>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box3>
                <Box3>
                  <Bar long={60} thin bold />
                  <Br bottom={14} />
                  <Bar long={50} thin />
                  <Br bottom={8} />
                  <Bar long={55} thin />
                  <Br bottom={8} />
                  <Bar long={40} thin />
                  <Br bottom={8} />
                </Box3>
              </ListsWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === HELP_LAYOUT.HELPCENTER}>
            <CheckLabel
              title="仅目录"
              $active={layout === HELP_LAYOUT.HELPCENTER}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(HELP_LAYOUT.FAQ, 'helpLayout')}>
          <Block $active={layout === HELP_LAYOUT.FAQ}>
            <Br bottom={14} />
            <Main>
              <FAQFullWrapper>
                <Bar long={30} />
                <Br bottom={20} />
                <Bar long={60} thin bold />
                <Br bottom={10} />
                <Bar long={85} thin />
                <Br bottom={10} />
                <Bar long={50} thin bold />
                <Br bottom={10} />
                <Bar long={60} thin />
                <Br bottom={10} />
                <Bar long={50} thin bold />
                <Br bottom={10} />
                <Bar long={60} thin />
              </FAQFullWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === HELP_LAYOUT.FAQ}>
            <CheckLabel
              title="仅常见问题"
              $active={layout === HELP_LAYOUT.FAQ}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.HELP_LAYOUT}
        loading={saving}
        top={20}
        bottom={30}
      />

      <Br bottom={10} />
      <SavingBar
        isTouched={isFileTreeDirectionTouched}
        field={SETTING_FIELD.FILE_TREE_DIRECTION}
        loading={saving}
      >
        <FileTreeSettings>
          <div>文件树位置:</div>
          <Space right={20} />
          <Radio
            size="small"
            items={[
              {
                value: '左侧',
                key: 'left',
              },
              {
                value: '右侧',
                key: 'right',
              },
            ]}
            activeKey={fileTreeDirection}
            onChange={(item) => edit(item.key, 'fileTreeDirection')}
          />
        </FileTreeSettings>
      </SavingBar>
    </Wrapper>
  )
}

export default memo(HelpLayout)
