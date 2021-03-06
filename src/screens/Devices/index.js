import React, { useState, useEffect, useCallback } from 'react'
import t from 'prop-types'

import api from '~/services/api'

import Loading from '~/components/Loading'

import Device from './Device'

import { Container, List } from './styled'

const gradient = {
  Televisão: ['#eb3349', '#f45c43'],
  Ventilador: ['#48b1bf', '#06beb6'],
  'Ar condicionado': ['#1e3c72', '#2a5298']
}

export default function Devices ({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [devices, setDevices] = useState([])

  useEffect(() => {
    async function fetchDevices () {
      try {
        setLoading(true)

        const response = await api.get('client/devices')

        const data = response.data.map(item => ({
          ...item,
          gradient: gradient[item._id]
        }))

        setDevices(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()
  }, [])

  const handleDevice = useCallback((type, data) => {
    navigation.navigate('Brands', { type, data })
  }, [])

  return (
    <Container>
      {loading && <Loading />}

      {!loading && (
        <List
          data={devices}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            const { _id: type, data, gradient } = item

            return (
              <Device
                name={type}
                gradient={gradient}
                handleDevice={() => handleDevice(type, data)}
              />
            )
          }}
        />
      )}
    </Container>
  )
}

Devices.propTypes = {
  navigation: t.shape({
    navigate: t.func
  }).isRequired
}
