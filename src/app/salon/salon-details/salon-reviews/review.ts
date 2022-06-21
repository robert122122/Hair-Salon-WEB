export interface Review {
    id: number,
    salonId: number,
    userName: string,
    rating: number,
    dateAdded: Date,
    dateUpdated: Date,
    text: string
}

export interface ReviewPost {
    salonId: number,
    userId: number,
    text: string,
    rating: number
}