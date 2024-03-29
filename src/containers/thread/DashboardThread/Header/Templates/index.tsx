import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { HEADER_LAYOUT } from '@/constant/layout'

import { SETTING_FIELD } from '../../constant'
import SavingBar from '../../SavingBar'

import Center from './Center'
import Float from './Float'
import Right from './Right'

import useHeaderSettingsInfo from '../../hooks/useHeaderSettingsInfo'
import { Wrapper, ArrowIcon, ToggleButton, ToggleText } from '../../styles/header/templates'

const Templates: FC = () => {
  const {
    isLayoutTouched: isTouched,
    headerLayout,
    saving,
    headerLinks: links,
    threads,
  } = useHeaderSettingsInfo()
  const [showAll, setShowAll] = useState<boolean>(false)

  const linksProps = { threads, links }
  return (
    <Wrapper>
      {showAll ? (
        <>
          <Center {...linksProps} $active={headerLayout === HEADER_LAYOUT.CENTER} />
          <Right {...linksProps} $active={headerLayout === HEADER_LAYOUT.RIGHT} />
          <Float {...linksProps} $active={headerLayout === HEADER_LAYOUT.FLOAT} />
        </>
      ) : (
        <>
          {headerLayout === HEADER_LAYOUT.CENTER && <Center {...linksProps} $active />}
          {headerLayout === HEADER_LAYOUT.RIGHT && <Right {...linksProps} $active />}
          {headerLayout === HEADER_LAYOUT.FLOAT && <Float {...linksProps} $active />}
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

export default observer(Templates)
