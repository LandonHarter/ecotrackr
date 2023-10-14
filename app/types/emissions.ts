import { Timestamp } from "firebase/firestore";

export type CarbonActivityType = 'car' | 'plane' | 'stove';

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

export type PlaneRide = CarbonActivity & {
    distance: number;
}

export type StoveLevel = 'low' | 'medium' | 'high';
export type Stove = CarbonActivity & {
    level: StoveLevel;
    duration: number;
}