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

export interface Types {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUri: string,
    wrapperColor: Color,
    isCustom: boolean,
    flowers: Flower[],
    user: User
}