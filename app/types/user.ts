import { Timestamp } from "firebase/firestore";
import { CarbonActivity } from "./emissions";

type User = {
    id: string;
    name: string;
    email: string;
    picture: string;
    createdAt: Timestamp;

    carbonEmissions: number;
    carbonActivities: CarbonActivity[];
};

export default User;