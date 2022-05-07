import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'

import { theme } from '../../theme'
import { FeedbackType } from '../../utils'
import { Options, Form, Success } from '..'

import { styles } from './styles'

const Widget = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpenBottomSheet = () => {
    bottomSheetRef?.current?.expand()
  }

  const handleSelectFeedbackType = (type: FeedbackType) => {
    setFeedbackType(type)
  }

  const handleCancelFeedback = () => {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  const handleSubmitFeedback = async () => {
    setFeedbackSent(true)
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpenBottomSheet}>
        <ChatTeardropDots
          size={24}
          weight='bold'
          color={theme.colors.text_on_brand}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onResetFeedback={handleCancelFeedback} />
        ) : feedbackType ? (
          <Form
            feedbackType={feedbackType}
            onCancelFeedback={handleCancelFeedback}
            onSubmitFeedback={handleSubmitFeedback}
          />
        ) : (
          <Options onSelectFeedbackType={handleSelectFeedbackType} />
        )}
      </BottomSheet>
    </>
  )
}

export default gestureHandlerRootHOC(Widget) as React.FC
