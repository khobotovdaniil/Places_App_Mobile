import { StyleSheet, FlatList, View, Text } from 'react-native'

import PlaceItem from './PlaceItem'
import { Colors } from '../../constants/colors'

export default function PlaceDetails({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start edding some!
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  )
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
})
