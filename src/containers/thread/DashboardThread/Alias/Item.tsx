import { FC, memo, Fragment } from 'react'

import AddButton from '@/widgets/Buttons/AddButton'
import { SpaceGrow } from '@/widgets/Common'

import { SETTING_FIELD, BUILDIN_ALIAS_SUGGESTIONS } from '../constant'
import Suggestion from './Suggestion'
import SavingBar from '../SavingBar'

import type { TNameAlias } from '../spec'

import {
  Wrapper,
  Header,
  Title,
  AliasTitle,
  InputWrapper,
  Inputer,
  Footer,
  ArrowWrapper,
  ArrowLine,
  ArrowIcon,
} from '../styles/alias/item'

import { updateEditingAlias, resetEdit } from '../logic'

type TProps = {
  alias: TNameAlias
  editingAlias: TNameAlias
}

const Item: FC<TProps> = ({ alias, editingAlias }) => {
  const isEditMode: boolean = alias.slug === editingAlias?.slug
  const isChanged: boolean = alias.original !== alias.name

  return (
    <Wrapper>
      <Header>
        {isEditMode ? (
          <SavingBar isTouched field={SETTING_FIELD.NAME_ALIAS}>
            <InputWrapper>
              <Inputer
                value={editingAlias?.name}
                autoFocus
                onChange={(e) => updateEditingAlias({ ...editingAlias, name: e.target.value })}
              />
            </InputWrapper>
          </SavingBar>
        ) : (
          <Title>{alias.original}</Title>
        )}

        {!isEditMode && isChanged && (
          <Fragment>
            <ArrowWrapper>
              <ArrowLine />
              <ArrowIcon />
            </ArrowWrapper>
            <AliasTitle>{alias.name}</AliasTitle>
          </Fragment>
        )}
      </Header>
      <Footer>
        {isEditMode ? (
          <Suggestion
            items={BUILDIN_ALIAS_SUGGESTIONS[alias.slug]}
            onChange={(name) => updateEditingAlias({ ...alias, name })}
          />
        ) : (
          <Fragment>
            <AddButton
              top={10}
              icon="edit"
              dimWhenIdle
              right={15}
              onClick={() => updateEditingAlias(alias)}
            >
              修改
            </AddButton>
            {isChanged && (
              <AddButton
                top={10}
                withIcon={false}
                dimWhenIdle
                onClick={() => {
                  updateEditingAlias({ ...alias, name: alias.original })
                  resetEdit(SETTING_FIELD.NAME_ALIAS)
                }}
              >
                恢复默认
              </AddButton>
            )}
          </Fragment>
        )}
        <SpaceGrow />
      </Footer>
    </Wrapper>
  )
}

export default memo(Item)
