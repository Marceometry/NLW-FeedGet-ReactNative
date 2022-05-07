import { Camera, Trash } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { theme } from '../../theme'
import { styles } from './styles'

interface Props {
  screenshot: string | null
  onScreenshot: () => void
  onRemoveScreenshot: () => void
  isLoading: boolean
}

export const ScreenshotButton = ({
  screenshot,
  onScreenshot,
  onRemoveScreenshot,
  isLoading,
}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveScreenshot : onScreenshot}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_primary} />
      ) : screenshot ? (
        <View>
          <Image style={styles.image} source={{ uri: screenshot }} />
          <Trash
            size={22}
            color={theme.colors.text_secondary}
            weight='fill'
            style={styles.trashIcon}
          />
        </View>
      ) : (
        <Camera size={24} color={theme.colors.text_secondary} weight='bold' />
      )}
    </TouchableOpacity>
  )
}
