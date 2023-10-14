import { CarRide } from "@/types/emissions";

function carbonFromCarRide(carRide: CarRide) {
    let carbonContentPerGallon: number;
    switch (carRide.fuelType) {
        case 'petrol':
            carbonContentPerGallon = 20;
            break;
        case 'diesel':
            carbonContentPerGallon = 22.2;
            break;
        case 'electric':
            return 0;
        default:
            carbonContentPerGallon = 20;
    }

    const emissions = (carRide.distance / carRide.fuelEfficiency) * carbonContentPerGallon;
    return emissions;
}