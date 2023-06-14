import { FC, useState } from 'react'

import { FOOTER_LAYOUT } from '@/constant/layout'

import type { TFooterSettings } from '../../spec'

import { SETTING_FIELD } from '../../constant'
import SavingBar from '../../SavingBar'

import Simple from './Simple'
import Full from './Full'

import { Wrapper, ArrowIcon, ToggleButton, ToggleText } from '../../styles/footer/templates'
import { resetEditingLink } from '../../logic/links'

type TProps = {
  settings: TFooterSettings
  isTouched: boolean
}

const Templates: FC<TProps> = ({ settings, isTouched }) => {
  const [showAll, setShowAll] = useState<boolean>(false)

  const { footerLayout, saving, footerLinks } = settings

  return (
    <Wrapper>
      {showAll ? (
        <>
          <Simple $active={footerLayout === FOOTER_LAYOUT.SIMPLE} links={footerLinks} />
          <Full $active={footerLayout === FOOTER_LAYOUT.FULL} links={footerLinks} />
        </>
      ) : (
        <>
          {footerLayout === FOOTER_LAYOUT.SIMPLE && <Simple $active links={footerLinks} />}
          {footerLayout === FOOTER_LAYOUT.FULL && <Full $active links={footerLinks} />}
        </>
      )}

      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.FOOTER_LAYOUT}
        onConfirm={() => setShowAll(false)}
        loading={saving}
        top={20}
        bottom={30}
      />

      {!isTouched && !saving && (
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
