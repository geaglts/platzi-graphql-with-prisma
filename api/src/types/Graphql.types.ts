export type Attributes = {
  shape?: string
  taste?: string
  hardiness?: string
}

export type Avocado = {
  id?: string
  sku: string
  name: string
  price: number
  description: string
  image: string
  attributes: Attributes
}

export type InputCreateAvocado = {
  name: string
  price: number
  description: string
  image: string
  shape: string
  taste: string
  hardiness: string
}
