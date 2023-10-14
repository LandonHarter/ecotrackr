'use client'

import { useAuthSession } from "@/context/UserContext";
import { db } from "@/firebase/init";
import { CarRide, FuelType, Stove, StoveLevel } from "@/types/emissions";
import { carbonFromActivity } from "@/util/carbon";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Timestamp, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

export default function LogStoveTop({ closeModal }: { closeModal: Function }) {
    const { user, updateUser } = useAuthSession();
    const [name, setName] = useState<string>(`Car Ride ${user?.carbonActivities.length ?? 0}`);
    const [duration, setDuration] = useState<number>(0);
    const [stoveLevel, setStoveLevel] = useState<StoveLevel>('medium');
    const [loading, setLoading] = useState<boolean>(false);

    async function logRide() {
        if (user == null) {
            toast.error('You must be logged in to log a car ride.');
            return;
        }

        if (duration === 0 || name === '') {
            toast.error('Please fill out all fields.');
            return;
        }

        setLoading(true);
        const userDoc = doc(collection(db, 'users'), user.id);
        const activityObject: Stove = {
            level: stoveLevel,
            duration,
            name,
            time: Timestamp.now(),
            type: 'stove'
        };
        await updateDoc(userDoc, {
            carbonActivities: arrayUnion(activityObject),
            carbonEmissions: user.carbonEmissions + carbonFromActivity(activityObject)
        });
        await updateUser();

        setDuration(0);
        setStoveLevel('medium');
        setLoading(false);
        closeModal();
    }

    return (
        <div className='flex flex-col items-center mt-4'>
            <div className='flex flex-col items-center mb-8'>
                <Input placeholder='Name your stovetop session' className='w-full text-xl mb-4' onChange={(e) => {
                    setName(e.target.value);
                }} />

                <Input type='number' placeholder='10' endContent='minutes' className='w-full mb-4' onChange={(e) => {
                    setDuration(parseInt(e.target.value));
                }} />

                <Select label='Stove Level' defaultSelectedKeys={['medium']} onChange={(e) => {
                    setStoveLevel(e.target.value as StoveLevel);
                }}>
                    <SelectItem key='low' value='low'>Low</SelectItem>
                    <SelectItem key='medium' value='medium'>Medium</SelectItem>
                    <SelectItem key='high' value='high'>High</SelectItem>
                </Select>
            </div>

            <Button color='primary' onPress={logRide} isLoading={loading}>Log</Button>
        </div>
    );
}