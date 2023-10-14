'use client'

import { useAuthSession } from "@/context/UserContext";
import { db } from "@/firebase/init";
import { CarRide, FuelType } from "@/types/emissions";
import { carbonFromActivity } from "@/util/carbon";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Timestamp, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

export default function LogCarRide({ closeModal }: { closeModal: Function }) {
    const { user, updateUser } = useAuthSession();
    const [distance, setDistance] = useState<number>(0);
    const [mpg, setMpg] = useState<number>(0);
    const [fuelType, setFuelType] = useState<FuelType>('gasoline');
    const [loading, setLoading] = useState<boolean>(false);

    async function logRide() {
        if (user == null) {
            toast.error('You must be logged in to log a car ride.');
            return;
        }

        if (distance == 0 || mpg == 0) {
            toast.error('Please fill out all fields.');
            return;
        }

        setLoading(true);
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
            carbonActivities: arrayUnion(activityObject),
            carbonEmissions: user.carbonEmissions + carbonFromActivity(activityObject)
        });
        await updateUser();

        setDistance(0);
        setMpg(0);
        setFuelType('gasoline');
        setLoading(false);
        closeModal();
    }

    return (
        <div className='flex flex-col items-center mt-4'>
            <div className='flex flex-col items-center mb-8'>
                <div className='flex items-center mb-4'>
                    <Input type='number' placeholder='10' endContent='miles' className='w-32 mr-2' onChange={(e) => {
                        setDistance(parseInt(e.target.value));
                    }} />
                    <Input type='number' placeholder='20' endContent='mpg' className='w-32 ml-2' onChange={(e) => {
                        setMpg(parseInt(e.target.value));
                    }} />
                </div>

                <Select label='Fuel Type' defaultSelectedKeys={['gasoline']} onChange={(e) => {
                    setFuelType(e.target.value as FuelType);
                }}>
                    <SelectItem key='gasoline' value='gasoline'>Petrol</SelectItem>
                    <SelectItem key='diesel' value='diesel'>Diesel</SelectItem>
                    <SelectItem key='electric' value='electric'>Electric</SelectItem>
                </Select>
            </div>

            <Button color='primary' onPress={logRide} isLoading={loading}>Log</Button>
        </div>
    );
}