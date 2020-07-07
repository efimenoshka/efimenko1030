export interface Mstudent {
    id: number,
    surname: string,
    name: string,
    middlename: string,
    phone: string,
    email: string,
    birthday: string,
    group: string,
    direction: number;
}

export enum MstudentDirection {
    bachelor,
    specialist,
    magistracy
}