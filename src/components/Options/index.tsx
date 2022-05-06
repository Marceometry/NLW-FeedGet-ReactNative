import React from 'react'
import { Text, View } from 'react-native'

import { feedbackTypes } from '../../utils'
import { Card, Copyright } from '..'

import { styles } from './styles'

export const Options = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Card key={key} title={value.title} image={value.image} />
        ))}
      </View>

      <Copyright />
    </View>
  )
}
