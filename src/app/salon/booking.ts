export interface Booking {
    salonId: number,
    serviceId: number,
    barberId: number,
    bookingDate:Date,
    userId:number
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