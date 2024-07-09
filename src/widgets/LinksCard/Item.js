/*
 *
 * FAQ Post
 *
 */

import React from 'react'
import T from 'prop-types'

import { ICON } from '~/config'

import { Wrapper, Title, Reaction, Icon, Count } from './styles/item'

const Item = ({ item, onSelect }) => {
  return (
    <Wrapper onClick={() => onSelect(item)}>
      <Title>{item.title}</Title>
      <Reaction>
        <Icon src={`${ICON}/shape/vote-up-solid.svg`} />
        <Count>28</Count>
      </Reaction>
    </Wrapper>
  )
}

Item.propTypes = {
  item: T.shape({
    title: T.string,
  }).isRequired,
  onSelect: T.func.isRequired,
}

Item.defaultProps = {}

export default React.memo(Item)
