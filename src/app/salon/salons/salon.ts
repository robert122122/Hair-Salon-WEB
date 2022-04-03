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

export interface Address {
    id: number,
    country: string,
    city: string,
    street: string,
    number: number,
}