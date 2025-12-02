export interface restaurant {
    id: number,
    restaurantName: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
}
export type Newrestaurant= Omit<restaurant,"id">;