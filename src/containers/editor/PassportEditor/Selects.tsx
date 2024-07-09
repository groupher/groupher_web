import { keys, includes } from 'ramda'

import { Trans } from '~/i18n/dashboard'
import Checker from '~/widgets/Checker'

import useLogic from './useLogic'
import { Wrapper, Item, ReadonlyItem, CheckIcon, RootCheckIcon, ItemTitle } from './styles/selects'

export default () => {
  const { getRules, allModeratorRules, selectedRules, getIsReadonly, toggleCheck } = useLogic()
  const rules = getRules()

  const optionsJson = JSON.parse(rules)
  const optionKeys = keys(optionsJson)

  const readonly = getIsReadonly()

  if (readonly) {
    const moderatorKeys = keys(JSON.parse(allModeratorRules))

    return (
      <Wrapper>
        {optionKeys.map((ruleKey: string) => {
          const isRootRule = !includes(ruleKey, moderatorKeys)

          return (
            <ReadonlyItem key={ruleKey}>
              {isRootRule ? <RootCheckIcon /> : <CheckIcon />}

              <ItemTitle>{Trans(ruleKey)}</ItemTitle>
            </ReadonlyItem>
          )
        })}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {optionKeys.map((ruleKey: string) => {
        return (
          <Item key={ruleKey}>
            <Checker
              checked={includes(ruleKey, selectedRules)}
              size="small"
              onChange={(checked) => toggleCheck(ruleKey, checked)}
            >
              <ItemTitle>{Trans(ruleKey)}</ItemTitle>
            </Checker>
          </Item>
        )
      })}
    </Wrapper>
  )
}
