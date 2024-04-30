'use client'

import { I18nContext } from '@/i18n'

// 默认的语言配置
const defaultLocale = 'en'

// 创建 context
// export const LangContext = createContext()

export const I18nProvider = ({ children }) => {
  const locale = {
    hello: 'world',
  }

  return <I18nContext.Provider value={{ locale }}>{children}</I18nContext.Provider>
}
