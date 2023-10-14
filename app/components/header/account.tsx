'use client'

import { auth } from "@/firebase/init";
import { Avatar, Button, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function HeaderAccount() {
    const [user, loading, error] = useAuthState(auth);
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
                <Avatar name={user?.displayName || ''} src={user?.photoURL || ''} icon={null} showFallback className="cursor-pointer" />
            </>
        );
    }

    if (status === 'authenticated') return avatar();
    else if (status === 'unauthenticated') return noAvatar();
    return (<Skeleton className="flex rounded-full w-10 h-10" />);
}