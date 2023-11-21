import { StyleSheet, View, Image, Text, Pressable } from 'react-native'

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({})
