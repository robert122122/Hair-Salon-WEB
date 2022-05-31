export interface Service {
    id: number,
    serviceName: string,
    description: string,
    cost: number,
    serviceTime: number,
    salonId: number
}

export interface ServicePost {
    serviceName: string,
    description: string,
    cost: number,
    serviceTime: number,
    salonId: number
}

export interface ServicePut {
    serviceName: string,
    description: string,
    cost: number,
    serviceTime: number,
}