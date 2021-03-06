import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: theme.colors.surface_secondary,
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    color: theme.colors.text_primary,
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    marginTop: 8,
  },
})
