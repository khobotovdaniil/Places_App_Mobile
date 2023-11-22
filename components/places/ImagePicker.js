import { useState } from 'react'
import { StyleSheet, View, Alert, Image, Text } from 'react-native'
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker'

import { Colors } from '../../constants/colors'
import OutlinedButton from '../UI/OutlinedButton'

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState()

  const [cameraPermissionInfo, requerstPermission] = useCameraPermissions()

  async function verifyPermissions() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requerstPermission()

      return permissionResponse.granted
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      )
      return false
    }

    return true
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })
    setPickedImage(image.assets[0].uri)
  }

  let imagePreview = <Text>No image taken yet...</Text>

  if (pickedImage) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: pickedImage }}
      />
    )
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton
        icon="camera"
        onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
})
