import { FC, memo } from 'react'
import { keys } from 'ramda'

import GLOW_EFFECTS, { GLOW_OPACITY } from '@/constant/glow_effect'

import { Inline, Br } from '@/widgets/Common'
import ArrowButton from '@/widgets/Buttons/ArrowButton'
import Radio from '@/widgets/Switcher/Radio'

import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import { SETTING_FIELD } from '../constant'

import {
  Wrapper,
  Row,
  Box,
  NoBox,
  ForbidIcon,
  CloseIcon,
  GrowBackground,
  SettingsRow,
  SettingTitle,
} from '../styles/layout/glow_effect'
import { edit } from '../logic'

type TProps = {
  glowType: string
  glowFixed: boolean
  glowOpacity: string
  isTouched: boolean
  isGrowFixedTouched: boolean
  isGrowOpacityTouched: boolean
  saving: boolean
}

const GlowEffect: FC<TProps> = ({
  glowType,
  glowFixed,
  glowOpacity,
  isTouched,
  isGrowFixedTouched,
  isGrowOpacityTouched,
  saving,
}) => {
  const EFFECTS_KEYS = keys(GLOW_EFFECTS)

  return (
    <Wrapper>
      <SectionLabel
        title="页面辉光"
        desc={
          <>
            设置后每个页面的展示光晕（阅览页面除外），可配合壁纸风格搭配。
            <Inline left={4}>
              <ArrowButton size="tiny" arrowStyle="simple">
                了解更多
              </ArrowButton>
            </Inline>
          </>
        }
      />

      <Row>
        <NoBox $active={glowType === ''} onClick={() => edit('', 'glowType')}>
          <ForbidIcon />
          <CloseIcon />
        </NoBox>

        {EFFECTS_KEYS.map((effect) => (
          <Box key={effect} $active={effect === glowType} onClick={() => edit(effect, 'glowType')}>
            <GrowBackground glowPosition="absolute" glowType={effect} />
          </Box>
        ))}
      </Row>

      <SavingBar isTouched={isTouched} field={SETTING_FIELD.GLOW_TYPE} loading={saving} top={30} />

      <Br bottom={40} />

      <SavingBar isTouched={isGrowFixedTouched} field={SETTING_FIELD.GLOW_FIXED} loading={saving}>
        <SettingsRow>
          <SettingTitle>滑动跟随:</SettingTitle>
          <Radio
            size="small"
            items={[
              {
                value: '固定位置',
                key: true,
              },
              {
                value: '随页面滚动',
                key: false,
              },
            ]}
            activeKey={glowFixed}
            onChange={(item) => edit(item.key, 'glowFixed')}
          />
        </SettingsRow>
      </SavingBar>

      <Br bottom={40} />

      {glowType !== '' && (
        <SavingBar
          isTouched={isGrowOpacityTouched}
          field={SETTING_FIELD.GLOW_OPACITY}
          loading={saving}
        >
          <SettingsRow>
            <SettingTitle>辉光强度:</SettingTitle>
            <Radio
              size="small"
              items={[
                {
                  value: '正常',
                  key: GLOW_OPACITY.NORMAL,
                },
                {
                  value: '弱',
                  key: GLOW_OPACITY.WEEK,
                },
              ]}
              activeKey={glowOpacity}
              onChange={(item) => edit(item.key, 'glowOpacity')}
            />
          </SettingsRow>
        </SavingBar>
      )}
    </Wrapper>
  )
}

export default memo(GlowEffect)