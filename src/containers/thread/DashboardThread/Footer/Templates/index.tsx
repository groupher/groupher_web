import { type FC, useState } from 'react'

import { FOOTER_LAYOUT } from '~/const/layout'

import { SETTING_FIELD } from '../../constant'
import SavingBar from '../../SavingBar'

import Simple from './Simple'
import Group from './Group'

import useFooter from '../../logic/useFooter'
import { Wrapper, ArrowIcon, ToggleButton, ToggleText } from '../../styles/footer/templates'

const Templates: FC = () => {
  const { getIsLayoutTouched, footerLayout, saving, footerLinks, resetEditingLink } = useFooter()
  const [showAll, setShowAll] = useState<boolean>(false)

  const isLayoutTouched = getIsLayoutTouched('footerLayout')

  return (
    <Wrapper>
      {showAll ? (
        <>
          <Simple $active={footerLayout === FOOTER_LAYOUT.SIMPLE} links={footerLinks} />
          <Group active={footerLayout === FOOTER_LAYOUT.GROUP} links={footerLinks} />
        </>
      ) : (
        <>
          {footerLayout === FOOTER_LAYOUT.SIMPLE && <Simple $active links={footerLinks} />}
          {footerLayout === FOOTER_LAYOUT.GROUP && <Group active links={footerLinks} />}
        </>
      )}

      <SavingBar
        isTouched={isLayoutTouched}
        field={SETTING_FIELD.FOOTER_LAYOUT}
        onConfirm={() => setShowAll(false)}
        loading={saving}
        top={20}
        bottom={30}
      />

      {!isLayoutTouched && !saving && (
        <ToggleButton
          size="small"
          ghost
          noBorder
          onClick={() => {
            setShowAll(!showAll)
            resetEditingLink()
          }}
        >
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
