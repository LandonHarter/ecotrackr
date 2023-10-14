'use client'

import { useAuthSession } from "@/context/UserContext";
import { db } from "@/firebase/init";
import { CarRide, FuelType } from "@/types/emissions";
import { Timestamp, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export default function LogCarRide() {
    const { user } = useAuthSession();
    const [distance, setDistance] = useState<number>(0);
    const [mpg, setMpg] = useState<number>(0);
    const [fuelType, setFuelType] = useState<FuelType>('gasoline');
    const [loading, setLoading] = useState<boolean>(false);

    async function logRide() {
        if (user == null) return;

        const userDoc = doc(collection(db, 'users'), user.id);
        const activityObject: CarRide = {
            distance,
            fuelEfficiency: mpg,
            fuelType,
            name: 'Car Ride',
            time: Timestamp.now(),
            type: 'car'
        };
        await updateDoc(userDoc, {
            carbonActivities: arrayUnion(activityObject)
        });
    }

    return (
        <></>
    );
}