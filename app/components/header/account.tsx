'use client'

import { useAuthSession } from "@/context/UserContext";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeaderAccount() {
    const { user, loading, error } = useAuthSession();
    const [status, setStatus] = useState<'authenticated' | 'unauthenticated' | 'loading'>('loading');

    useEffect(() => {
        if (loading) setStatus('loading');
        else if (!user) setStatus('unauthenticated');
        else if (user) setStatus('authenticated');
        else setStatus('unauthenticated');
    }, [user, loading, error]);

    function noAvatar() {
        return (
            <>
                <Link href='/signin'>
                    <Button color="primary" className="font-medium text-md p-6">Get Started</Button>
                </Link>
            </>
        );
    }

    function avatar() {
        return (
            <>
                <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                        <Avatar name={user?.name || ''} src={user?.picture || ''} icon={null} showFallback className="cursor-pointer" />
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key='test'>Test</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </>
        );
    }

    if (status === 'authenticated') return avatar();
    else if (status === 'unauthenticated') return noAvatar();
    return (<Skeleton className="flex rounded-full w-10 h-10" />);
}