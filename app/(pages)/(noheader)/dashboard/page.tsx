'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './page.module.scss';
import RequireAuth from "@/components/auth/requireauth";
import HouseSVG from "@/svg/house";
import DashboardMainHome from "./pages/main/home";

export default function DashboardPage() {
    const [selectedItem, setSelectedItem] = useState('main.home');
    const pageUi: { [page: string]: React.ReactNode } = {
        'main.home': <DashboardMainHome />
    };

    function SidebarItem({ title, icon, href }: { title: string, icon: React.ReactNode, href: string }) {
        return (
            <div className={`flex items-center ml-3 cursor-pointer rounded-md p-2 transition-all bg-transparent ${href == selectedItem && 'bg-zinc-300'}`} onClick={() => {
                setSelectedItem(href);
            }}>
                {icon}
                <h1 className='text-lg font-normal'>{title}</h1>
            </div>
        );
    }

    return (
        <RequireAuth redirectUrl='/signin'>
            <div className='flex w-screen h-screen p-1.5'>
                <div className='w-1/6 min-w-[300px] h-full rounded-xl flex flex-col'>
                    <Link href='/' className='flex items-center ml-4 mt-4 mb-12'>
                        <Image src='/images/icons/icon128.png' alt='icon' width={45} height={45} />
                        <h1 className='text-2xl h-fit mx-2 flex'>eco<div className='mr-px' /><strong className='font-bold'>trackr</strong></h1>
                    </Link>

                    <h1 className='text-xl font-normal text-gray-600 ml-5 mb-4'>Main</h1>
                    <div className='w-11/12 h-0.5 bg-gray-300 ml-5 mb-2' />
                    <SidebarItem title='Home' icon={<HouseSVG className={styles.sidebar_icon} />} href='main.home' />
                </div>

                <div className='w-5/6 h-full p-4'>
                    <div className='w-full h-full rounded-xl flex flex-col bg-white border-2 border-gray-300 shadow-2xl flex flex-col'>
                        {pageUi[selectedItem]}
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
}