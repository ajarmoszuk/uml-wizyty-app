/**
 * Google Maps search URL for a Łódź city office street address.
 */
export function googleMapsUrl(streetAddress) {
  if (!streetAddress || typeof streetAddress !== 'string') {
    return 'https://www.google.com/maps/search/?api=1&query=%C5%81%C3%B3d%C5%BA%2C%20Polska'
  }
  const q = encodeURIComponent(`${streetAddress.trim()}, Łódź, Polska`)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}
