'use client'

import { Button, Input } from '@nextui-org/react';
import styles from '../../page.module.scss';
import AddSVG from '@/svg/add';
import SearchSVG from '@/svg/search';
import { useAuthSession } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { CarbonActivity } from '@/types/emissions';
import { carbonFromActivity } from '@/util/carbon';
import Image from 'next/image';
import { formatTimestamp } from '@/util/format';

export default function DashboardMainActivities() {
    const { user } = useAuthSession();
    const [activities, setActivities] = useState<CarbonActivity[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    function search(query: string) {
        if (query.length == 0) {
            setActivities(user?.carbonActivities ?? []);
            return;
        }

        setActivities(user?.carbonActivities.filter((activity) => activity.name.toLowerCase().includes(query.toLowerCase())) ?? []);
    }

    useEffect(() => {
        setActivities(user?.carbonActivities ?? []);
    }, [user]);

    return (
        <div className='flex flex-col p-8'>
            <div className='w-full h-fit rounded-xl grid grid-cols-[1fr_200px] gap-4 mb-8'>
                <Input className='w-full' classNames={{
                    inputWrapper: 'h-12',
                    input: 'h-full rounded-xl text-xl font-medium',
                }} startContent={<SearchSVG className={styles.search_icon} />} onChange={(e) => {
                    setSearchQuery(e.target.value);
                    search(e.target.value);
                }} />
                <Button color='primary' className='w-[200px] h-12 px-6 py-3 font-medium text-xl' startContent={<AddSVG className={styles.log_activity_icon} />}>Log Activity</Button>
            </div>

            <div className='flex flex-col w-full'>
                {activities.map((activity, i) => {
                    const emission = carbonFromActivity(activity);
                    return (
                        <div key={i} className='w-full flex justify-between items-center p-4 border-b-2'>
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
            </div>
        </div>
    );
}