/*
 * ThemeStore store
 *
 */

import { keys } from 'ramda'

import type { TRootStore, TThemeName, TMembership } from '@/spec'
import { DEFAULT_THEME } from '@/config'

import { T, markStates, getParent, Instance } from '@/mobx'
import { themeSkins } from '@/utils/themes'
import { toast } from '@/signal'

export const ThemeDefaults = {
  curTheme: DEFAULT_THEME,
}

export const ThemeStore = T.model('ThemeStore', {
  curTheme: T.opt(T.enum('theme', keys(themeSkins)), DEFAULT_THEME),
})
  .views((self) => ({
    get themeData() {
      return themeSkins[self.curTheme]
    },
  }))
  .actions((self) => ({
    isMemberOf(type: TMembership): boolean {
      const root = getParent(self) as TRootStore
      return root.isMemberOf(type)
    },
    checkSetable(): boolean {
      const { isMemberOf } = self as TStore
      if (isMemberOf('seniorMember') || isMemberOf('sponsorMember') || isMemberOf('donateMember')) {
        return false
      }

      toast('保存主题设置失败: 仅支持高级会员以打赏用户')
      return false
    },
    changeTheme(name: TThemeName): void {
      self.curTheme = name
      // self.checkSetable()
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ThemeStore>
