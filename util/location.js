const API_KEY = 'dce1cf32-7bc4-40c6-90e7-e87ff66be90f'
const zoom = 11
const width = 400
const height = 200

export function getMapPreview(lat, lng) {
  console.log(lng)
  const imagePreviewUrl = `https://static-maps.yandex.ru/v1?ll=${lat},${lng}&size=${width},${height}&z=${zoom}&pt=${lat},${lng},pm2blm10~${lat},${lng}&apikey=${API_KEY}`
  const test = `https://static-maps.yandex.ru/v1?ll=${lat},55.753630&lang=en&size=${width},${height}&z=${zoom}&pt=${lat},55.753630&apikey=${API_KEY}`
  return test
}
