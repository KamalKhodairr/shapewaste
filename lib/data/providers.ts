export interface Provider {
  _id: string
  name: string
  region: string
  country: string
  materials: string[]
  licensed: boolean
  licenceBody?: string
}

export const MAT_COLOR: Record<string, string> = {
  'Plastics':      '#8A8248',
  'Paper & board': '#6E8250',
  'Metals':        '#B47A2E',
  'E-waste':       '#9C7A38',
  'Organics':      '#4E7358',
  'C&D':           '#3B534C',
}

export const ALL_REGIONS = ['Riyadh', 'Jeddah', 'Dammam', 'Dubai', 'Abu Dhabi', 'Sharjah']
export const ALL_MATERIALS = ['Plastics', 'Paper & board', 'Metals', 'E-waste', 'Organics', 'C&D']
