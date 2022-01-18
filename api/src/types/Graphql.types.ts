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
  imgUrl: string
  attributes: Attributes
}

export type InputCreateAvocado = {
  sku: string
  name: string
  price: number
  description: string
  imgUrl: string
  shape: string
  taste: string
  hardiness: string
}
