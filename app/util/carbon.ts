import { CarRide, CarbonActivity, PlaneRide, Stove, StoveLevel } from "@/types/emissions";

function carbonFromActivity(activity: CarbonActivity) {
    switch (activity.type) {
        case 'car': return carbonFromCarRide(activity as CarRide);
        case 'plane': return carbonFromPlaneRide(activity as PlaneRide);
        case 'stove': return carbonFromStove(activity as Stove);
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

    const emissions = ((carRide.distance / carRide.fuelEfficiency) * carbonContentPerGallon).toFixed(1);
    return emissions;
}

function carbonFromPlaneRide(planeRide: PlaneRide) {
    let factor = 0;
    if (planeRide.distance < 300) {
        factor = 0.00025;
    } else if (planeRide.distance >= 300 && planeRide.distance <= 2299) {
        factor = 0.00014;
    } else {
        factor = 0.00017;
    }

    const emissions = planeRide.distance * factor;
    const emissionsToKg = (emissions * 1000).toFixed(1);
    return emissionsToKg;
}

function carbonFromStove(cooking: Stove) {
    const gasConsumptionRate: Record<StoveLevel, number> = {
        low: 0.005,
        medium: 0.01,
        high: 0.02
    };
    const emissionFactor = 53.12;
    const gasUsedInMcf = (cooking.duration / 60) * gasConsumptionRate[cooking.level];
    const emissions = gasUsedInMcf * emissionFactor;

    return emissions.toFixed(1);
}

export { carbonFromActivity, carbonFromCarRide };