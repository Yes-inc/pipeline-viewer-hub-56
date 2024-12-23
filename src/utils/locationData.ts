import type { LatLngExpression } from 'leaflet';

export const locationCoordinates: { [key: string]: LatLngExpression } = {
  'Portugal': [39.3999, -8.2245],
  'Bangladesh': [23.6850, 90.3563],
  'Brazil': [-14.2350, -51.9253],
  'Dubai': [25.2048, 55.2708],
  'Namibia': [-22.9576, 18.4904],
  'Amsterdam': [52.3676, 4.9041],
  'Houston, Texas': [29.7604, -95.3698],
  'Boynton Beach, Florida, USA': [26.5317, -80.0905],
  'United States': [37.0902, -95.7129],
  'United States ': [37.0902, -95.7129], // With space to match exact string
  'North Carolina, United States': [35.7596, -79.0193],
  'New York, United States': [40.7128, -74.0060],
  'California, United States': [36.7783, -119.4179],
  'Texas, United States': [31.9686, -99.9018],
  'Florida, United States': [27.6648, -81.5158],
  'Washington, United States': [47.7511, -120.7401],
  'Illinois, United States': [40.6331, -89.3985],
  'Virginia, United States': [37.4316, -78.6569],
  'United Kingdom': [55.3781, -3.4360],
  'Germany': [51.1657, 10.4515],
  'France': [46.2276, 2.2137],
  'Spain': [40.4637, -3.7492],
  'Italy': [41.8719, 12.5674],
  'Singapore': [1.3521, 103.8198],
  'Japan': [36.2048, 138.2529],
  'Australia': [-25.2744, 133.7751],
  'Canada': [56.1304, -106.3468],
  'Mexico': [23.6345, -102.5528],
  'South Africa': [-30.5595, 22.9375],
  'India': [20.5937, 78.9629],
  'China': [35.8617, 104.1954]
};

// Helper function to get the closest matching location
export const findClosestLocation = (location: string): LatLngExpression | null => {
  // First try exact match
  if (locationCoordinates[location]) {
    return locationCoordinates[location];
  }

  // Try to find a partial match
  const normalizedLocation = location.toLowerCase();
  for (const [key, coordinates] of Object.entries(locationCoordinates)) {
    if (normalizedLocation.includes(key.toLowerCase()) || 
        key.toLowerCase().includes(normalizedLocation)) {
      return coordinates;
    }
  }

  console.warn(`No coordinates found for location: ${location}`);
  return null;
};