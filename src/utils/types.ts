export enum Color {
    RED,
    GREEN,
    BLUE,
    YELLOW,
    BLACK,
    WHITE,
    ORANGE,
    PURPLE,
    PINK,
    BROWN,
    GRAY,
    CYAN,
    MAGENTA,
    TEAL,
    LIME,
    OLIVE,
    NAVY,
    MAROON
}

export enum PaymentType {
    TRANSFER = 'TRANSFER',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    imageUri: string
}

export interface Flower {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUri: string,
    color: Color,
    availableQuantity: number
}

export interface Bouquet {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUri: string,
    wrapperColor: Color,
    isCustom: boolean,
    flowers: FlowerBouquet[],
    user: User
}

export interface CartPosition {
    bouquetId: number,
    quantity: number
}

export interface FlowerBouquet {
    flower: Flower,
    quantity: number
}

export interface Address {
    id: number,
    city: string,
    street: string,
    house: string,
    apartment: string,
    postalCode: string
}

export interface DeliveryType {
    id: number,
    name: string,
    price: number
}

export interface Delivery {
    id: number,
    deliveryType: DeliveryType,
    address: Address
}

export interface Bonus {
    id: number,
    promoCode: string,
    discount: number,
    durationDate: string
}