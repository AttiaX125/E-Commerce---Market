export interface ReviewDataType {
  createdAt: string
  product: string
  rating: number
  review: string
  updatedAt: string
  user: User
  _id: string
}

export interface User {
  name: string
  _id: string
}
