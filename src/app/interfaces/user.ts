export interface User {
    id: number,
    restaurantName: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    password:string,
}
export type NewUser = Omit<User, "id">;