import { card } from "./card";

export interface deck{
    id?:number;
    name:string;
    cards:card[];
}