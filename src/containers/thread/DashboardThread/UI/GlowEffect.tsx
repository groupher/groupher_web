import { FC, memo } from 'react'
import { keys } from 'ramda'

import { GLOW_EFFECTS } from '@/constant'

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
  GrowBackground,
  SettingsRow,
  SettingTitle,
} from '../styles/ui/glow_effect'
import { updateGlowType, updateGlowFixed } from '../logic'

type TProps = {
  glowType: string
  glowFixed: boolean
  isTouched: boolean
  isGrowFixedTouched: boolean
  saving: boolean
}

const GlowEffect: FC<TProps> = ({ glowType, glowFixed, isTouched, isGrowFixedTouched, saving }) => {
  const EFFECTS_KEYS = keys(GLOW_EFFECTS)

  return (
    <Wrapper>
      <SectionLabel
        title="页面辉光"
        desc={
          <>
            设置后每个页面的展示光晕（阅览页面除外）
            <Inline left={4}>
              <ArrowButton size="tiny" arrowStyle="simple">
                影响范围
              </ArrowButton>
            </Inline>
          </>
        }
      />

      <Row>
        {EFFECTS_KEYS.map((effect) => (
          <Box
            key={effect}
            $active={effect === glowType}
            onClick={() => updateGlowType(effect === glowType ? '' : effect)}
          >
            <GrowBackground glowPosition="absolute" glowType={effect} />
          </Box>
        ))}
      </Row>

      <SavingBar isTouched={isTouched} field={SETTING_FIELD.GLOW_TYPE} loading={saving} top={30} />

      <Br bottom={30} />

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
            onChange={(item) => updateGlowFixed(item.key as boolean)}
          />
        </SettingsRow>
      </SavingBar>
    </Wrapper>
  )
}

export default memo(GlowEffect)
