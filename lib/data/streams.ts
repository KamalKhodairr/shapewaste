export interface Stream {
  id: string
  label: string
  rate: number
  dispose: number
  tonnes: number
  color: string
}

export const DEFAULT_STREAMS: Stream[] = [
  { id: 'metals',   label: 'Metals & aluminium',        rate: 3500, dispose: 130, tonnes: 2,   color: '#B47A2E' },
  { id: 'ewaste',   label: 'E-waste',                   rate: 2200, dispose: 200, tonnes: 0.5, color: '#9C7A38' },
  { id: 'plastics', label: 'Plastics',                  rate: 900,  dispose: 120, tonnes: 6,   color: '#8A8248' },
  { id: 'paper',    label: 'Paper & cardboard',         rate: 450,  dispose: 100, tonnes: 10,  color: '#6E8250' },
  { id: 'organics', label: 'Food & organic',            rate: 180,  dispose: 110, tonnes: 8,   color: '#4E7358' },
  { id: 'cd',       label: 'Construction & demolition', rate: 90,   dispose: 80,  tonnes: 0,   color: '#3B534C' },
]

export const AXIS_DATA = [
  { label: 'Construction & demolition', rate: 90,   color: '#2F4A3F' },
  { label: 'Food & organic',            rate: 180,  color: '#3E5C46' },
  { label: 'Paper & cardboard',         rate: 450,  color: '#6B7F5F' },
  { label: 'Plastics',                  rate: 900,  color: '#8A8A52' },
  { label: 'E-waste',                   rate: 2200, color: '#8C6F3E' },
  { label: 'Metals & aluminium',        rate: 3500, color: '#A9782E' },
]
