'use client'

import { useAuthSession } from "@/context/UserContext";
import { CircularProgress } from "@nextui-org/react";
import styles from '../../page.module.scss';
import Image from "next/image";
import { formatTimestamp } from "@/util/format";
import { carbonFromActivity } from "@/util/carbon";

export default function DashboardMainHome() {
    const { user } = useAuthSession();

    return (
        <div className='flex flex-col p-8'>
            <h1 className='font-semibold text-3xl mb-16'>Home</h1>

            <div className={styles.home_layout}>
                <div className='w-full h-full flex flex-col items-center justify-center border-gray-200 border-4 rounded-lg p-8 mr-4'>
                    <h1 className='font-medium text-2xl mb-8 text-center'>Your Carbon Emissions</h1>
                    <CircularProgress
                        aria-label='emissions'
                        value={user?.carbonEmissions || 0}
                        formatOptions={{
                            style: 'unit',
                            unit: 'kilogram'
                        }}
                        size='lg'
                        className='w-48 h-48 scale-[4]'
                        classNames={{
                            value: 'text-[8px] font-medium'
                        }}
                        color={(user?.carbonEmissions || 0) >= 2500 ? 'danger' : (user?.carbonEmissions || 0) >= 1000 ? 'warning' : 'success'}
                        maxValue={3500}
                        showValueLabel
                    />
                </div>
                <div className='w-full h-full flex flex-col justify-center border-gray-200 border-4 rounded-lg p-8'>
                    <h1 className='font-medium text-2xl mb-8'>Your Activity</h1>

                    {user?.carbonActivities.map((activity, i) => {
                        const numActivities = user?.carbonActivities.length || 1;
                        if (i < numActivities - 2) return null;

                        const emission = carbonFromActivity(activity);

                        return (
                            <div key={i} className='w-full flex justify-between items-center p-4 border-t-2'>
                                <div className='flex items-center'>
                                    <Image src={`/images/activity/${activity.type}.png`} alt='car' width={60} height={60} />
                                    <div className='flex flex-col ml-8'>
                                        <h1 className='font-medium text-xl'>{activity.name}</h1>
                                        <h1 className='font-normal text-gray-500'>{formatTimestamp(activity.time)}</h1>
                                    </div>
                                </div>

                                <div className='flex items-center'>
                                    <h1 className='font-medium text-2xl mr-4'>{emission}kg</h1>
                                </div>
                            </div>
                        );
                    })}
                    {user?.carbonActivities.length === 0 ?
                        <div className='w-full h-full flex items-center justify-center'>
                            <h1 className='font-medium text-xl text-gray-400'>No activities yet</h1>
                        </div> : <div className='border-b-2' />
                    }
                </div>
            </div>
        </div>
    );
}