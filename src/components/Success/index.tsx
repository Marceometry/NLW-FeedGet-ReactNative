import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import successImg from '../../assets/success.png'
import { Copyright } from '..'
import { styles } from './styles'

type Props = {
  onResetFeedback: () => void
}

export const Success = ({ onResetFeedback }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity style={styles.button} onPress={onResetFeedback}>
        <Text style={styles.buttonText}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  )
}
