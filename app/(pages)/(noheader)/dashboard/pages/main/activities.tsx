'use client'

import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
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
import { SortBy } from '@/types/sort';
import sortActivities from '@/util/sort';
import LogPlaneRide from './(activities)/plane';
import LogStoveTop from './(activities)/stove';
import { Timestamp } from 'firebase/firestore';

export default function DashboardMainActivities() {
    const { user } = useAuthSession();
    const [activities, setActivities] = useState<CarbonActivity[]>([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [activity, setActivity] = useState<CarbonActivity | null>(null);
    const { isOpen: activityOpen, onOpen: activityOpenFunc, onOpenChange: activityOpenChange } = useDisclosure();

    const [selectedActivity, setSelectedActivity] = useState<CarbonActivityType | null>(null);
    const [serachQuery, setSearchQuery] = useState<string>('');
    const [logPage, setLogPage] = useState(0);
    const [sortBy, setSortBy] = useState<SortBy>('recent');

    function search(query: string) {
        if (query.length == 0) {
            const activities = user?.carbonActivities ?? [];
            const sorted = sortActivities(activities, sortBy);
            setActivities(sorted);
            return;
        }

        const filtered = user?.carbonActivities.filter((activity) => activity.name.toLowerCase().includes(query.toLowerCase())) ?? [];
        const sorted = sortActivities(filtered, sortBy);

        setSearchQuery(query);
        setActivities(sorted);
    }

    function getPageUi(onClose: Function) {
        switch (selectedActivity) {
            case 'car': return <LogCarRide closeModal={onClose} />;
            case 'plane': return <LogPlaneRide closeModal={onClose} />;
            case 'stove': return <LogStoveTop closeModal={onClose} />;
            default: return <></>;
        }
    }

    function CarbonActivity({ name }: { name: string }) {
        return (
            <label htmlFor={name} className={styles.radio_card}>
                <input type="radio" id={name} onChange={() => {
                    setSelectedActivity(name.toLowerCase() as CarbonActivityType);
                }} checked={name.toLowerCase() == selectedActivity} />
                <div className={styles.card_content_wrapper}>
                    <span className={styles.check_icon}></span>
                    <div className={styles.card_content}>
                        <Image src={`/images/activity/${name.toLowerCase()}.png`} alt={name} width={70} height={70} />
                        <h4>{name}</h4>
                    </div>
                </div>
            </label>
        );
    }

    function ActivityField({ label, content }: { label: string, content: string }) {
        return (
            <div className='w-full flex justify-between items-center border-b-2 border-gray-200 pb-1 mb-4'>
                <h1 className='text-lg text-gray-500'>{label}</h1>
                <h1 className='font-medium text-lg'>{content}</h1>
            </div>
        );
    }

    useEffect(() => {
        search(serachQuery);
    }, [user, sortBy]);

    useEffect(() => {
        if (!isOpen) {
            setSelectedActivity(null);
            setLogPage(0);
        }
    }, [isOpen]);

    return (
        <div className='flex flex-col p-8'>
            <div className='w-full h-fit rounded-xl grid grid-cols-[1fr_150px_200px] gap-4 mb-8'>
                <Input className='w-full' classNames={{
                    inputWrapper: 'h-12',
                    input: 'h-full rounded-xl text-xl font-medium',
                }} startContent={<SearchSVG className={styles.search_icon} />} onChange={(e) => {
                    search(e.target.value);
                }} />

                <Select label='Sort by' className='w-full' classNames={{
                    mainWrapper: 'h-12',
                    listbox: 'h-full',
                }} defaultSelectedKeys={['recent']} onChange={(e) => {
                    setSortBy(e.target.value as SortBy);
                }}>
                    <SelectItem key='recent' value='Recent'>Recent</SelectItem>
                    <SelectItem key='oldest' value='Oldest'>Oldest</SelectItem>
                    <SelectItem key='a-z' value='A-Z'>A-Z</SelectItem>
                    <SelectItem key='z-a' value='Z-A'>Z-A</SelectItem>
                </Select>

                <Button color='primary' className='w-[200px] h-12 px-6 py-3 font-medium text-xl' startContent={<AddSVG className={styles.log_activity_icon} />} onPress={onOpen}>Log Activity</Button>
            </div>

            <div className='flex flex-col w-full'>
                {activities.map((activity, i) => {
                    const emission = carbonFromActivity(activity);
                    return (
                        <div key={i} className='w-full flex justify-between items-center p-4 border-b-2 cursor-pointer' onClick={() => {
                            setActivity(activity);
                            activityOpenFunc();
                        }}>
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

                {activities.length == 0 &&
                    <div className='w-full h-64 flex flex-col items-center justify-center'>
                        <h1 className='font-medium text-2xl text-gray-400'>No activities logged</h1>
                    </div>
                }
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl' hideCloseButton>
                <ModalContent className='w-full flex flex-col items-center p-6'>
                    {(onClose: Function) => (
                        <>
                            <ModalHeader className='font-medium text-3xl mb-1'>Log Activity</ModalHeader>
                            {logPage === 0 &&
                                <>
                                    <div className='grid grid-cols-3 gap-8 mb-12'>
                                        <CarbonActivity name='Car' />
                                        <CarbonActivity name='Plane' />
                                        <CarbonActivity name='Stove' />
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
                                <>
                                    {getPageUi(onClose)}
                                </>
                            }
                        </>
                    )}
                </ModalContent>
            </Modal>

            {activity &&
                <Modal isOpen={activityOpen} onOpenChange={activityOpenChange}>
                    <ModalContent className='w-full flex flex-col items-center p-6'>
                        <ModalHeader className='font-medium text-3xl mb-4'>{activity?.name}</ModalHeader>
                        <ModalBody className='w-full flex flex-col items-center'>
                            <div className='w-11/12 flex flex-col items-center mb-8'>
                                <ActivityField label='Type' content={activity?.type || ''} />
                                <ActivityField label='Date' content={formatTimestamp(activity?.time || Timestamp.now())} />
                                <ActivityField label='Emission' content={`${carbonFromActivity(activity)}kg`} />
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </div>
    );
}