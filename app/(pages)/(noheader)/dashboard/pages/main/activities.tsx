'use client'

import { Button, Input } from '@nextui-org/react';
import styles from '../../page.module.scss';
import AddSVG from '@/svg/add';

export default function DashboardMainActivities() {
    return (
        <div className='flex flex-col p-8'>
            <div className={`w-full h-fit rounded-xl`}>
                <Input className='w-full h-full' />
                <Button color='primary' className='w-fit h-fit px-6 py-3 font-medium text-xl' startContent={<AddSVG className={styles.log_activity_icon} />}>Log Activity</Button>
            </div>
        </div>
    );
}