import { CarbonActivity } from "@/types/emissions";
import { SortBy } from "@/types/sort";
import { carbonFromActivity } from "./carbon";

export default function sortActivities(activities: CarbonActivity[], sortBy: SortBy) {
    switch (sortBy) {
        case 'recent': return sortActivitiesByRecent(activities);
        case 'oldest': return sortActivitiesByOldest(activities);
        case 'highest-carbon': return sortActivitiesByHighestCarbon(activities);
        case 'lowest-carbon': return sortActivitiesByLowestCarbon(activities);
        case 'a-z': return sortActivitiesByAtoZ(activities);
        case 'z-a': return sortActivitiesByZtoA(activities);
        default: return activities;
    }
}

function sortActivitiesByRecent(activities: CarbonActivity[]) {
    return activities.sort((a, b) => {
        return b.time.toDate().getTime() - a.time.toDate().getTime();
    });
}

function sortActivitiesByOldest(activities: CarbonActivity[]) {
    return activities.sort((a, b) => {
        return a.time.toDate().getTime() - b.time.toDate().getTime();
    });
}

function sortActivitiesByHighestCarbon(activities: CarbonActivity[]) {
    return activities.sort((a, b) => {
        return carbonFromActivity(a) - carbonFromActivity(b);
    });
}

function sortActivitiesByLowestCarbon(activities: CarbonActivity[]) {
    return activities.sort((a, b) => {
        return carbonFromActivity(b) - carbonFromActivity(a);
    });
}

function sortActivitiesByAtoZ(activities: CarbonActivity[]) {
    return activities.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
}

function sortActivitiesByZtoA(activities: CarbonActivity[]) {
    return activities.sort((a, b) => {
        return b.name.localeCompare(a.name);
    });
}