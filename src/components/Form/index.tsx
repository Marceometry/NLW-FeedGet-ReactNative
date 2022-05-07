import React, { useState } from 'react'
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native'
import { captureScreen } from 'react-native-view-shot'
import { ArrowLeft } from 'phosphor-react-native'
import * as FileSystem from 'expo-file-system'

import { FeedbackType, feedbackTypes } from '../../utils'
import { api } from '../../services/api'
import { theme } from '../../theme'
import { Button, ScreenshotButton } from '..'
import { styles } from './styles'

interface Props {
  feedbackType: FeedbackType
  onCancelFeedback: () => void
  onSubmitFeedback: () => void
}

export const Form = ({
  feedbackType,
  onCancelFeedback,
  onSubmitFeedback,
}: Props) => {
  const [comment, setComment] = useState('')
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const feedbackInfo = feedbackTypes[feedbackType]

  const handleRemoveScreenshot = () => {
    setScreenshot(null)
  }

  const handleScreenshot = async () => {
    try {
      setIsTakingScreenshot(true)
      const uri = await captureScreen({
        format: 'jpg',
        quality: 0.8,
      })
      setScreenshot(uri)
    } catch (error) {
    } finally {
      setIsTakingScreenshot(false)
    }
  }

  const handleSubmitFeedback = async () => {
    try {
      setIsSubmittingFeedback(true)
      let screenshotBase64 = null
      if (screenshot) {
        const base64 = await FileSystem.readAsStringAsync(screenshot, {
          encoding: 'base64',
        })
        screenshotBase64 = `data:image/png;base64, ${base64}`
      }
      const payload = {
        comment,
        type: feedbackType,
        screenshot: screenshotBase64,
      }
      await api.post('/feedback', payload)
      onSubmitFeedback()
    } catch (error) {
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancelFeedback}>
          <ArrowLeft
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackInfo.image} style={styles.image} />

          <Text style={styles.titleText}>{feedbackInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        onChangeText={setComment}
        placeholderTextColor={theme.colors.text_secondary}
        placeholder='Conte com detalhes o que está acontecendo...'
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onScreenshot={handleScreenshot}
          onRemoveScreenshot={handleRemoveScreenshot}
          isLoading={isTakingScreenshot}
        />
        <Button
          onPress={handleSubmitFeedback}
          isLoading={isSubmittingFeedback}
          disabled={isSubmittingFeedback}
        />
      </View>
    </View>
  )
}
