import { CarRide, CarbonActivity } from "@/types/emissions";

function carbonFromActivity(activity: CarbonActivity) {
    switch (activity.type) {
        case 'car': return carbonFromCarRide(activity as CarRide);
        default: return 0;
    }
}

function carbonFromCarRide(carRide: CarRide) {
    let carbonContentPerGallon: number;
    switch (carRide.fuelType) {
        case 'gasoline':
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

    const emissions = Math.round((carRide.distance / carRide.fuelEfficiency) * carbonContentPerGallon);
    return emissions;
}

export { carbonFromActivity, carbonFromCarRide };