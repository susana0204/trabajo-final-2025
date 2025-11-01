export interface User{
    id: number,
    firstname:string,
    lastname:string,
    username:string,
    password:string,

}


export type NewUser = Omit<User,"id">;
