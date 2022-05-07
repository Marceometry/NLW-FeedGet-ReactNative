import React from 'react'
import { Text, View } from 'react-native'

import { FeedbackType, feedbackTypes } from '../../utils'
import { Card, Copyright } from '..'

import { styles } from './styles'

type Props = {
  onSelectFeedbackType: (type: FeedbackType) => void
}

export const Options = ({ onSelectFeedbackType }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Card
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onSelectFeedbackType(key as FeedbackType)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  )
}
