import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function Map() {
  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={region}></MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
