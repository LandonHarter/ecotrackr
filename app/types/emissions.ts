import { Timestamp } from "firebase/firestore";

export type CarbonActivityType = 'car';

export type CarbonActivity = {
    name: string;
    time: Timestamp;
    type: CarbonActivityType;
}

export type FuelType = 'gasoline' | 'diesel' | 'electric';
export type CarRide = CarbonActivity & {
    distance: number;
    fuelEfficiency: number;
    fuelType: FuelType;
}