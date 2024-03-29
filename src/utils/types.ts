export enum Color {
    RED = "Red",
    GREEN = "Green",
    BLUE = "Blue",
    YELLOW = "Yellow",
    BLACK = "Black",
    WHITE = "White",
    ORANGE = "Orange",
    PURPLE = "Purple",
    PINK = "Pink",
    BROWN = "Brown",
    GRAY = "Gray",
    CYAN = "Cyan",
    MAGENTA = "Magenta",
    TEAL = "Teal",
    LIME = "Lime",
    OLIVE = "Olive",
    NAVY = "Navy",
    MAROON = "Maroon"
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
    addresses: Address[]
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

export interface BouquetCreationRequest {
    name: string,
    description: string,
    wrapperColor: string,
    positions: FlowerBouquetRequest[],
}

export interface CartPosition {
    bouquetId: number,
    quantity: number
}

export interface FlowerBouquet {
    flower: Flower,
    quantity: number
}

export interface FlowerBouquetRequest {
    flowerId: number,
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

export interface Bonus {
    id: number,
    promoCode: string,
    discount: number,
    durationDate: string
}

export enum Size {
    SMALL = "Small",
    MEDIUM = "Medium",
    BIG = "Big",
    ALL = "All"
}

export enum Occasion {
    BIRTHDAY = "Birthday",
    ANNIVERSARY = "Anniversary",
    GRADUATION = "Graduation"
}

export interface OccasionFilter {
    occasion: Occasion;
    minFlowerCount?: number;
    maxFlowerCount?: number;
    wrapperColor?: Color;
}

export interface Filter {
    occasion: Occasion | null,
    priceMin: number | null,
    priceMax: number | null,
    color?: Color | null,
    size?: Size | null;
}

export interface BouquetWithQuantity {
    bouquet: Bouquet,
    quantity: number
}

export interface OrderCreationRequest {
    paymentType: PaymentType,
    addressId: number,
    deliveryTypeId: number,
    bonusId: number | undefined,
    bouquets: BouquetWithQuantity[]
}