import React from 'react'
import t from 'prop-types'

import { Container, Item, Wrapper, Name } from './styled'

const data = [
  {
    id: 1,
    name: 'Televisão',
    gradient: ['#d66d75', '#e29587']
  },
  {
    id: 2,
    name: 'Ar condicionado',
    gradient: ['#eb3349', '#f45c43']
  },
  {
    id: 3,
    name: 'Ventilador',
    gradient: ['#48b1bf', '#06beb6']
  }
]

export default function List ({ handleNavigate }) {
  return (
    <Container
      data={data}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => {
        const { gradient, name } = item
        return (
          <Item gradient={gradient}>
            <Wrapper onPress={handleNavigate}>
              <Name>{name}</Name>
            </Wrapper>
          </Item>
        )
      }}
    />
  )
}

List.propTypes = {
  handleNavigate: t.func.isRequired
}
