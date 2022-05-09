export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    token:string;   
}

export interface User {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    token:string;
}
