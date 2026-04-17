export interface ShippingAdressType {
  shippingAddress: UserShippingAddress
}

export interface UserShippingAddress {
  details: string
  phone: string
  city: string
  postalCode: string
}
