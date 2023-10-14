'use client'

import { useAuthSession } from "@/context/UserContext";
import { db } from "@/firebase/init";
import { PlaneRide } from "@/types/emissions";
import { carbonFromActivity } from "@/util/carbon";
import { Button, Input } from "@nextui-org/react";
import { Timestamp, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

export default function LogPlaneRide({ closeModal }: { closeModal: Function }) {
    const { user, updateUser } = useAuthSession();
    const [name, setName] = useState<string>(`Car Ride ${user?.carbonActivities.length ?? 0}`);
    const [distance, setDistance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    async function logRide() {
        if (user == null) {
            toast.error('You must be logged in to log a car ride.');
            return;
        }

        if (distance == 0 || name == '') {
            toast.error('Please fill out all fields.');
            return;
        }

        setLoading(true);
        const userDoc = doc(collection(db, 'users'), user.id);
        const activityObject: PlaneRide = {
            distance,
            name,
            time: Timestamp.now(),
            type: 'plane'
        };
        await updateDoc(userDoc, {
            carbonActivities: arrayUnion(activityObject),
            carbonEmissions: user.carbonEmissions + carbonFromActivity(activityObject)
        });
        await updateUser();

        setDistance(0);
        setLoading(false);
        closeModal();
    }

    return (
        <div className='flex flex-col items-center mt-4'>
            <div className='flex flex-col items-center mb-8'>
                <Input placeholder='Name your trip' className='w-full text-xl mb-4' onChange={(e) => {
                    setName(e.target.value);
                }} />

                <Input type='number' placeholder='600' endContent='miles' className='w-full mb-8' onChange={(e) => {
                    setDistance(parseInt(e.target.value));
                }} />

                <Button color='primary' onPress={logRide} isLoading={loading}>Log</Button>
            </div>
        </div>
    );
}