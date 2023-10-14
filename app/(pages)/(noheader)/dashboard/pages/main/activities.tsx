'use client'

import { Button, Input, Modal, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import styles from '../../page.module.scss';
import AddSVG from '@/svg/add';
import SearchSVG from '@/svg/search';
import { useAuthSession } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import { CarbonActivity, CarbonActivityType } from '@/types/emissions';
import { carbonFromActivity } from '@/util/carbon';
import Image from 'next/image';
import { formatTimestamp } from '@/util/format';
import { toast } from 'sonner';
import LogCarRide from './(activities)/car';

export default function DashboardMainActivities() {
    const { user } = useAuthSession();
    const [activities, setActivities] = useState<CarbonActivity[]>([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedActivity, setSelectedActivity] = useState<CarbonActivityType | null>(null);
    const [logPage, setLogPage] = useState(0);
    const pageUi: { [name: string]: React.ReactNode } = {
        'car': <LogCarRide />
    };

    function search(query: string) {
        if (query.length == 0) {
            setActivities(user?.carbonActivities ?? []);
            return;
        }

        setActivities(user?.carbonActivities.filter((activity) => activity.name.toLowerCase().includes(query.toLowerCase())) ?? []);
    }

    function CarbonActivity({ name }: { name: string }) {
        return (
            <label htmlFor={name} className={styles.radio_card}>
                <input type="radio" id={name} onChange={() => {
                    setSelectedActivity(name as CarbonActivityType);
                }} />
                <div className={styles.card_content_wrapper}>
                    <span className={styles.check_icon}></span>
                    <div className={styles.card_content}>
                        <Image src={`/images/activity/${name.toLowerCase()}.png`} alt='car' width={70} height={70} />
                        <h4>{name}</h4>
                    </div>
                </div>
            </label>
        );
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
                    search(e.target.value);
                }} />
                <Button color='primary' className='w-[200px] h-12 px-6 py-3 font-medium text-xl' startContent={<AddSVG className={styles.log_activity_icon} />} onPress={onOpen}>Log Activity</Button>
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

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
                <ModalContent className='w-full flex flex-col items-center p-6'>
                    <ModalHeader className='font-medium text-3xl mb-1'>Log Activity</ModalHeader>

                    {logPage === 0 &&
                        <>
                            <div className='grid grid-cols-1 gap-8 mb-12'>
                                <CarbonActivity name='Car' />
                            </div>

                            <Button color='primary' onPress={() => {
                                if (selectedActivity === null) {
                                    toast.error('Please select an activity to log.');
                                    return;
                                }

                                setLogPage(1);
                            }}>Continue</Button>
                        </>

                    }
                    {logPage === 1 &&
                        pageUi[selectedActivity ?? 'car']
                    }
                </ModalContent>
            </Modal>
        </div>
    );
}