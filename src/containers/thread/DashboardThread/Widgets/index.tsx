import { Br } from '~/widgets/Common'

import Button from '~/widgets/Buttons/Button'
import Tabs from '~/widgets/Switcher/Tabs'
import Radio from '~/widgets/Switcher/Radio'

import { WIDGET_TYPES } from '../constant'

import Portal from '../Portal'
import BaseSetting from './BaseSetting'
import CodeArea from './CodeArea'

import useWidgets from '../logic/useWidgets'
import {
  Wrapper,
  TypeSelect,
  TabWrapper,
  BtnWrapper,
  ViewIcon,
  HintTitle,
  HintDesc,
  InputWrapper,
  InputLabel,
  Inputer,
} from '../styles/widgets'

export default () => {
  const { widgetsType, edit } = useWidgets()

  return (
    <Wrapper>
      <Portal
        title="网站插件"
        desc="为您的主页添加社区，更新日志，看板等插件，让产品用户及时方便的了解最新动态。"
      />

      <BaseSetting />
      <TypeSelect>
        <TabWrapper>
          <Tabs
            items={WIDGET_TYPES}
            size="small"
            activeKey={widgetsType}
            onChange={(slug) => {
              edit(slug, 'widgetsType')
              // onSave('widgetsType')
              console.log('## onSave widgetsType')
            }}
          />
        </TabWrapper>
        <Button size="small" space={8} top={-2} right={2} ghost>
          <BtnWrapper>
            <ViewIcon />
            预览
          </BtnWrapper>
        </Button>
      </TypeSelect>
      <InputWrapper>
        <InputLabel>目标元素 ID:</InputLabel>
        <Inputer />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>组件尺寸:</InputLabel>
        <Radio
          size="small"
          left={-20}
          items={[
            {
              value: '小',
              key: '1',
            },
            {
              value: '中',
              key: '2',
              dimOnActive: true,
            },
            {
              value: '大',
              key: '3',
              dimOnActive: true,
            },
          ]}
          activeKey="1"
        />
      </InputWrapper>
      <Br top={30} />
      <HintTitle>启用网站插件，请复制以下代码到您的站点源码中。</HintTitle>
      <Br top={8} />
      <CodeArea />
      <Br top={10} />
      <HintDesc>如果团队中缺乏相关技术人员，请联系我们。</HintDesc>
    </Wrapper>
  )
}
