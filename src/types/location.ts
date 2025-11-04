export interface Location {
  id: string
  name: string
  country: string
  isRemote: boolean
  createdAt: Date
  updatedAt: Date
}

export interface LocationFormData {
  name: string
  country: string
  isRemote: boolean
}
