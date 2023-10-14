export type CarbonActivity = {
    name: string;
    time: number;
}

export type FuelType = 'petrol' | 'diesel' | 'electric';
export type CarRide = CarbonActivity & {
    distance: number;
    fuelEfficiency: number;
    fuelType: FuelType;
}