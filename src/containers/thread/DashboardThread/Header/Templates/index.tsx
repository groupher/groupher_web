import { FC, useState } from 'react'

import { HEADER_LAYOUT } from '@/constant/layout'

import type { THeaderSettings } from '../../spec'

import { SETTING_FIELD } from '../../constant'
import SavingBar from '../../SavingBar'

import Center from './Center'
import Right from './Right'

import { Wrapper, ArrowIcon, ToggleButton, ToggleText } from '../../styles/header/templates'

type TProps = {
  settings: THeaderSettings
  isTouched: boolean
}

const Templates: FC<TProps> = ({ settings, isTouched }) => {
  const [showAll, setShowAll] = useState<boolean>(false)

  const { headerLayout, saving } = settings

  return (
    <Wrapper>
      {showAll ? (
        <>
          <Center $active={headerLayout === HEADER_LAYOUT.CENTER} />
          <Right $active={headerLayout === HEADER_LAYOUT.RIGHT} />
        </>
      ) : (
        <>
          {headerLayout === HEADER_LAYOUT.CENTER && <Center $active />}
          {headerLayout === HEADER_LAYOUT.RIGHT && <Right $active />}
        </>
      )}

      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.HEADER_LAYOUT}
        onConfirm={() => setShowAll(false)}
        loading={saving}
        top={20}
        bottom={30}
      />

      {!isTouched && !saving && (
        <ToggleButton size="small" ghost noBorder onClick={() => setShowAll(!showAll)}>
          <ToggleText>
            {showAll ? '收起' : '更换模板'}
            {/* @ts-ignore */}
            <ArrowIcon rotate={showAll} />
          </ToggleText>
        </ToggleButton>
      )}
    </Wrapper>
  )
}

export default Templates
