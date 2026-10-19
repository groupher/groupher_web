import type { ResultOf, VariablesOf } from '@graphql-typed-document-node/core'
import { useQueryClient } from '@tanstack/react-query'
import { find, forEach, reject, uniq } from 'ramda'
import { useMemo, useState } from 'react'

import EVENT from '~/const/event'
import { browserGraphQLRequest } from '~/graphql/client'
import { patchCommunityConfig } from '~/query'
import { executeCommand } from '~/query/mutation/optimistic/execute'
import { closeDrawer, send } from '~/signal'
import type { TModerator, TUser } from '~/spec'
import useAccount from '~/stores/account/hooks'
import useCommunity from '~/stores/community/hooks'
import useDsbEdit from '~/stores/dsbEdit/hooks'
import { useModeratorEditorUi } from '~/stores/dsbEditorUi/hooks'
import { toast } from '~/ui/Toaster'

import { PASSPORT_SCOPE } from './constant'
import S from './schema'
import type { TPassportScope, TTogglePassportRule } from './spec'

const normalizeRules = (rules: unknown): string => {
  if (typeof rules === 'string') return rules

  return JSON.stringify(rules ?? {})
}

const parseRules = (rules: string): Record<string, boolean> => JSON.parse(rules)

const safeParseRules = (rules: string): Record<string, boolean> => {
  try {
    return parseRules(rules)
  } catch (error) {
    console.error('## parse passport rules error: ', error)
    return {}
  }
}

type TPassportJson = Record<string, unknown>

const safeParsePassport = (passport: string): TPassportJson => {
  try {
    const parsed = JSON.parse(passport)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch (error) {
    console.error('## parse passport error: ', error)
    return {}
  }
}

const ruleKeys = (rules: Record<string, boolean>): string[] => Object.keys(rules)
const enabledRuleKeys = (rules: Record<string, boolean>): string[] => {
  const keys: string[] = []

  for (const [rule, enabled] of Object.entries(rules)) {
    if (enabled) keys.push(rule)
  }

  return keys
}

const enabledRuleCount = (rules: Record<string, boolean>): number => enabledRuleKeys(rules).length

const ruleMapFrom = (rules: unknown): Record<string, boolean> =>
  typeof rules === 'object' && rules !== null ? (rules as Record<string, boolean>) : {}

const communityPassportFrom = (
  passport: Record<string, unknown>,
  community: string,
): Record<string, unknown> => {
  if (!community) return {}

  const rules = passport[community]
  return typeof rules === 'object' && rules !== null ? (rules as Record<string, unknown>) : {}
}

const isCommunityRootPassport = (passport: Record<string, unknown>, community: string): boolean =>
  communityPassportFrom(passport, community).root === true

const hasGlobalGod = (user: TUser | null): boolean => user?.passport?.global?.god === true

const hasCommunityRoot = (user: TUser | null, community: string): boolean => {
  if (!user?.passport) return false

  return isCommunityRootPassport(user.passport, community)
}

const normalizeSocial = (
  social: {
    github: string | null
    twitter: string | null
    zhihu: string | null
  } | null,
): TUser['social'] =>
  social
    ? {
        github: social.github ?? undefined,
        twitter: social.twitter ?? undefined,
        zhihu: social.zhihu ?? undefined,
      }
    : undefined

const normalizeModerators = (
  moderators:
    | readonly ({
        isRoot?: boolean | null
        passportItemCount?: number | null
        user?: {
          login?: string | null
          avatar?: string | null
          nickname?: string | null
          bio?: string | null
        } | null
      } | null)[]
    | null
    | undefined,
): TModerator[] =>
  (moderators ?? []).flatMap((moderator) => {
    if (!moderator?.user?.login) return []

    return [
      {
        isRoot: moderator.isRoot ?? undefined,
        passportItemCount: moderator.passportItemCount ?? 0,
        user: {
          login: moderator.user.login,
          avatar: moderator.user.avatar ?? undefined,
          nickname: moderator.user.nickname ?? undefined,
          bio: moderator.user.bio ?? undefined,
        },
      },
    ]
  })

const mergeModerator = (
  moderators: readonly TModerator[],
  login: string,
  patch: Partial<TModerator>,
): TModerator[] =>
  moderators.map((moderator) =>
    moderator.user?.login === login ? { ...moderator, ...patch } : moderator,
  )

const mergeHydratedModerator = (
  moderators: readonly TModerator[],
  activeModerator: TUser,
  patch: Partial<TModerator>,
): TModerator[] => {
  if (!activeModerator.login) return [...moderators]
  const merged = mergeModerator(moderators, activeModerator.login, patch)
  if (merged.some((moderator) => moderator.user?.login === activeModerator.login)) return merged

  return [
    ...merged,
    {
      passportItemCount: 0,
      user: activeModerator,
      ...patch,
    },
  ]
}

const mergeModeratorSnapshots = (
  remoteModerators: readonly TModerator[],
  existingModerators: readonly TModerator[],
): TModerator[] =>
  remoteModerators.flatMap((moderator) => {
    const login = moderator.user?.login
    if (!login) return []

    const existing = find((item) => item.user?.login === login, existingModerators)
    return [
      {
        ...moderator,
        rules: existing?.rules,
        globalRules: existing?.globalRules,
      },
    ]
  })

const hasHydratedRules = (
  moderator: TModerator | null | undefined,
): moderator is TModerator & {
  rules: Record<string, boolean>
  globalRules: Record<string, boolean>
} => moderator?.rules !== undefined && moderator.globalRules !== undefined

type TRet = {
  activeModerator: TUser | null
  allRootRules: string
  allModeratorRules: string
  selectedGlobalRules: string[]
  selectedRules: string[]

  toggleCheck: TTogglePassportRule
  loadAllPassportRules: () => void
  updatePassport: () => Promise<void>
  deleteModerator: () => void

  rules: string
  isActiveModeratorRoot: boolean
  isActiveModeratorGod: boolean
  isCurUserModeratorRoot: boolean
  isReadonly: boolean
  loading: boolean
}

/** Exposes logic state and actions through the shared React hook boundary. */
export default function useLogic(): TRet {
  const queryClient = useQueryClient()
  const dsb$ = useDsbEdit()
  const moderatorUi$ = useModeratorEditorUi()
  const community$ = useCommunity()
  const account$ = useAccount()

  const { activeModerator, allRootRules, allModeratorRules } = moderatorUi$
  const [selectedGlobalRules, setSelectedGlobalRules] = useState<string[]>([])
  const [selectedRules, setSelectedRules] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const activeModeratorStoreItem = useMemo(() => {
    if (!activeModerator?.login) return null

    return find((moderator) => moderator.user?.login === activeModerator.login, dsb$.moderators)
  }, [activeModerator, dsb$.moderators])

  const toggleCheck = (
    rule: string,
    checked: boolean,
    scope: TPassportScope = PASSPORT_SCOPE.CMS,
  ): void => {
    if (scope === PASSPORT_SCOPE.GLOBAL) {
      setSelectedGlobalRules((rules) =>
        uniq(checked ? [...rules, rule] : reject((i) => i === rule, rules)),
      )
    } else {
      setSelectedRules((rules) =>
        uniq(checked ? [...rules, rule] : reject((i) => i === rule, rules)),
      )
    }
  }

  const loadUserPassport = async (): Promise<void> => {
    if (!activeModerator?.login) {
      setLoading(false)
      return
    }

    setLoading(true)
    setSelectedRules([])
    setSelectedGlobalRules([])

    if (hasHydratedRules(activeModeratorStoreItem)) {
      setSelectedGlobalRules(enabledRuleKeys(activeModeratorStoreItem.globalRules))
      setSelectedRules(enabledRuleKeys(activeModeratorStoreItem.rules))
      setLoading(false)
      return
    }

    try {
      const res = await browserGraphQLRequest(S.userPassport, {
        login: activeModerator.login,
      })
      const { passportString, social = null } = res?.user ?? {}
      const passportJson = safeParsePassport(passportString ?? '{}')
      const normalizedSocial = normalizeSocial(social)
      const globalRules = ruleMapFrom(passportJson.global)
      const communityPassport = communityPassportFrom(passportJson, community$.slug)
      const communityRules = ruleMapFrom(communityPassport.cms)
      const hasRootPassport = isCommunityRootPassport(passportJson, community$.slug)
      const nextModeratorPatch = {
        isRoot: hasRootPassport,
        passportItemCount: enabledRuleCount(communityRules),
        rules: communityRules,
        globalRules,
      }
      const moderators = mergeHydratedModerator(
        dsb$.moderators,
        { ...activeModerator, social: normalizedSocial },
        nextModeratorPatch,
      )

      moderatorUi$.patch({
        activeModerator: { ...activeModerator, social: normalizedSocial },
      })
      dsb$.editMany({ moderators })
      patchCommunityConfig(queryClient, community$.slug, { moderators })

      setSelectedGlobalRules(enabledRuleKeys(globalRules))
      setSelectedRules(enabledRuleKeys(communityRules))
    } catch (error) {
      console.error('## load user passport error: ', error)
      setSelectedGlobalRules([])
      setSelectedRules([])
      moderatorUi$.patch({
        activeModerator: { ...activeModerator, social: undefined },
      })
    } finally {
      setLoading(false)
    }
  }

  const loadAllPassportRules = (): void => {
    setLoading(true)
    browserGraphQLRequest(S.allPassportRules)
      .then((res) => {
        const { cms } = res.allPassportRulesString as {
          cms: { general?: unknown; community?: unknown }
        }
        const { general, community } = cms

        moderatorUi$.patch({
          allRootRules: normalizeRules(general),
          allModeratorRules: normalizeRules(community),
        })

        void loadUserPassport()
      })
      .catch((error) => {
        console.error('## load passport rules error: ', error)
        setSelectedGlobalRules([])
        setSelectedRules([])
        setLoading(false)
      })
  }

  const updatePassport = async (): Promise<void> => {
    const community = community$.slug
    if (!community || !activeModerator?.login) return
    const activeModeratorLogin = activeModerator.login

    const innerRules: Record<string, boolean> = {}
    const globalRules: Record<string, boolean> = {}

    forEach(
      (key) => {
        globalRules[key] = false
      },
      ruleKeys(safeParseRules(allRootRules)),
    )
    forEach((key) => {
      globalRules[key] = true
    }, selectedGlobalRules)

    forEach(
      (key) => {
        innerRules[key] = false
      },
      ruleKeys(safeParseRules(allModeratorRules)),
    )
    forEach((key) => {
      innerRules[key] = true
    }, selectedRules)

    const rules = { global: globalRules, [community]: { cms: innerRules } }

    await executeCommand<
      VariablesOf<typeof S.updateModeratorPassport>,
      ResultOf<typeof S.updateModeratorPassport>
    >({
      request: (variables) => browserGraphQLRequest(S.updateModeratorPassport, variables),
      variables: {
        community,
        user: activeModerator.login,
        rules: JSON.stringify(rules),
      },
    })
      .then(async (res) => {
        const remoteModerators = normalizeModerators(res.updateModeratorPassport?.moderators)
        const savedModeratorPatch = {
          passportItemCount: enabledRuleCount(innerRules),
          rules: innerRules,
          globalRules,
        }
        const moderators = mergeModerator(
          mergeModeratorSnapshots(remoteModerators, dsb$.moderators),
          activeModeratorLogin,
          savedModeratorPatch,
        )

        dsb$.editMany({ moderators })
        patchCommunityConfig(queryClient, community, { moderators })
        if (activeModeratorLogin === account$.user?.login) await account$.refreshSession()
        closeDrawer()
      })
      .catch((error) => {
        toast(error instanceof Error ? error.message : String(error), 'error')
      })
  }

  const deleteModerator = (): void => {
    if (!activeModerator?.login) return

    executeCommand<VariablesOf<typeof S.removeModerator>, ResultOf<typeof S.removeModerator>>({
      request: (variables) => browserGraphQLRequest(S.removeModerator, variables),
      variables: {
        community: community$.slug,
        user: activeModerator.login,
      },
    }).then(async (res) => {
      const moderators = normalizeModerators(res.removeModerator?.moderators)

      dsb$.editMany({ moderators })
      moderatorUi$.patch({ activeModerator: null })
      patchCommunityConfig(queryClient, community$.slug, { moderators })
      if (activeModerator.login === account$.user?.login) await account$.refreshSession()

      closeDrawer()
      send(EVENT.REFRESH_MODERATORS)
    })
  }

  const isActiveModeratorRoot = useMemo(() => {
    return activeModeratorStoreItem?.isRoot === true
  }, [activeModeratorStoreItem])

  const isCurUserModeratorRoot = useMemo(() => {
    if (hasGlobalGod(account$.user)) return true
    if (hasCommunityRoot(account$.user, community$.slug)) return true

    const curRoot = (community$.moderators ?? []).find((moderator) => moderator.isRoot)
    return curRoot?.user?.login === account$.user?.login
  }, [account$.user, community$.moderators, community$.slug])

  const rules = useMemo(() => {
    return isActiveModeratorRoot ? allRootRules : allModeratorRules
  }, [isActiveModeratorRoot, allRootRules, allModeratorRules])

  const isActiveModeratorGod = useMemo(() => {
    return selectedGlobalRules.includes('god')
  }, [selectedGlobalRules])

  const isReadonly = !isCurUserModeratorRoot

  return {
    selectedGlobalRules,
    selectedRules,
    activeModerator,
    allRootRules,
    allModeratorRules,

    toggleCheck,
    loadAllPassportRules,
    updatePassport,
    deleteModerator,

    // TODO:
    rules,
    isActiveModeratorRoot,
    isActiveModeratorGod,
    isCurUserModeratorRoot,
    isReadonly,
    loading,
  }
}
