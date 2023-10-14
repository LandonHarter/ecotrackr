'use client'

import { useAuthSession } from "@/context/UserContext";
import { CircularProgress } from "@nextui-org/react";

export default function DashboardMainHome() {
    const { user } = useAuthSession();

    return (
        <div className='flex flex-col p-8'>
            <h1 className='font-semibold text-3xl mb-16'>Home</h1>

            <div className='flex flex-wrap w-full'>
                <div className='w-fit max-w-[25%] h-fit flex flex-col items-center justify-center border-gray-200 border-4 rounded-lg p-8 mr-4'>
                    <h1 className='font-medium text-2xl mb-8'>Your Carbon Emissions</h1>
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
                <div className='w-full max-w-[70%] h-fit flex flex-col justify-center border-gray-200 border-4 rounded-lg p-8'>
                    <h1 className='font-medium text-2xl mb-8'>Your Activity</h1>
                </div>
            </div>
        </div>
    );
}