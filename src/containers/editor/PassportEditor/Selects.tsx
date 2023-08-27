import { FC } from 'react'

import { keys, includes } from 'ramda'

import Checker from '@/widgets/Checker'

import { Wrapper, Item, ReadonlyItem, CheckIcon, RootCheckIcon, ItemTitle } from './styles/selects'
import { toggleCheck } from './logic'

type TProps = {
  rules: string
  moderatorRules: string
  selectedRules: string[]
  readonly?: boolean
}

const Selects: FC<TProps> = ({ rules, moderatorRules, selectedRules, readonly = false }) => {
  const optionsJson = JSON.parse(rules)
  const optionKeys = keys(optionsJson)

  if (readonly) {
    const moderatorKeys = keys(JSON.parse(moderatorRules))

    return (
      <Wrapper>
        {optionKeys.map((ruleKey: string) => {
          const isRootRule = !includes(ruleKey, moderatorKeys)

          return (
            <ReadonlyItem key={ruleKey}>
              {isRootRule ? <RootCheckIcon /> : <CheckIcon />}

              <ItemTitle>{ruleKey}</ItemTitle>
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
              <ItemTitle>{ruleKey}</ItemTitle>
            </Checker>
          </Item>
        )
      })}
    </Wrapper>
  )
}

export default Selects
