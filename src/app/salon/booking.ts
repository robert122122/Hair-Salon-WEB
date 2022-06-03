export interface Booking {
    salonId: number,
    serviceId: number,
    barberId: number,
    bookingDate:Date,
    userId:number
}

export interface BookingGet {
    id:number,
    salon: string,
    service: string,
    barber: string,
    bookingDate:Date,
    user:string
}


export interface BookingResponse{
    id:number,
    salonId: number,
    serviceId: number,
    barberId: number,
    bookingDate:Date,
    userId:number,
    paid:boolean
}