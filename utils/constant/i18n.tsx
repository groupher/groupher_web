import styled, { css, theme } from '@/css'

import type { TLocale, TSelectOption } from '@/spec'

import PandaSVG from '@/icons/Panda'
import HuaSVG from '@/icons/Huaren'
import GuardSVG from '@/icons/EnGuard'
import RussiaSVG from '@/icons/Russia'
import SpainSVG from '@/icons/Spain'

export const LOCALE = {
  EN: 'en',
  ZH: 'zh',
} as Record<Uppercase<TLocale>, TLocale>

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(18)};
    margin-right: 6px;
    cursor: pointer;
  `
}

const Icon = {
  Guard: styled(commonIcon(GuardSVG))`
    ${css.size(19)};
  `,
  Russia: styled(commonIcon(RussiaSVG))`
    ${css.size(19)};
  `,
  Hua: styled(commonIcon(HuaSVG))`
    fill: ${theme('article.digest')};
    margin-top: 1px;
  `,
  Panda: styled(commonIcon(PandaSVG))`
    margin-top: 4px;
  `,
  Spain: styled(commonIcon(SpainSVG))`
    ${css.size(16)};
    margin-top: 1px;
    margin-left: 1px;
    margin-right: 2px;
  `,
}

export const LANGS_OPTIONS = [
  {
    label: '简体中文',
    value: LOCALE.ZH,
    icon: Icon.Panda,
  },
  {
    label: 'English',
    value: LOCALE.EN,
    icon: Icon.Guard,
  },
] as TSelectOption[]
