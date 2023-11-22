import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location'

import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/colors'
import { getMapPreview } from '../../util/location'

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState()
  const isFocused = useIsFocused()

  const navigation = useNavigation()
  const route = useRoute()

  const [locationPermissionInfo, requerstPermission] =
    useForegroundPermissions()

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params.pickedLocation
      setPickedLocation(mapPickedLocation)
    }
  }, [route, isFocused])

  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requerstPermission()

      return permissionResponse.granted
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app.'
      )
      return false
    }

    return true
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }

  function pickOnMapHandler() {
    navigation.navigate('Map')
  }

  let locationPreview = <Text>No location picked yet...</Text>

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton
          icon="location"
          onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton
          icon="map"
          onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
})
