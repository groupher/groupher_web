import { FC } from 'react'

import { keys, includes } from 'ramda'

import Checker from '@/widgets/Checker'

import { Wrapper, Item } from './styles/selects'
import { toggleCheck } from './logic'

type TProps = {
  rules: string
  selectedRules: string[]
}

const Selects: FC<TProps> = ({ rules, selectedRules }) => {
  const optionsJson = JSON.parse(rules)
  const optionKeys = keys(optionsJson)

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
              {ruleKey}
            </Checker>
          </Item>
        )
      })}
    </Wrapper>
  )
}

export default Selects
