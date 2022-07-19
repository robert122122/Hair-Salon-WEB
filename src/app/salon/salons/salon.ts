export interface Salon {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    image:string,
    address:Address,
    rating: any,
    description: string,
    logo: string
}

export interface SalonDTO {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    image:string,
    addressId:number,
    rating: any,
    description: string,
    logo: string
}

export interface SalonPost {
    name: string,
    email: string,
    phoneNumber: string,
    password:string
}

export interface SalonPut {
    name: string,
    description: string,
    email: string,
    phoneNumber: string,
    image: string,
    logo: string
}

export interface Address {
    id: number,
    country: string,
    city: string,
    street: string,
    number: string,
}