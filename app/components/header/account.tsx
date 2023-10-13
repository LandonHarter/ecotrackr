'use client'

import { Avatar, Button, Skeleton } from "@nextui-org/react";
import Link from "next/link";

export default function HeaderAccount() {
    const status: string = 'unauthenticated';

    function noUser() {
        return (
            <>
                <Link href='/'>
                    <Button color="primary" className="font-medium text-md p-6">Get Started</Button>
                </Link>
            </>
        );
    }

    function user() {
        return (
            <>
                <Avatar name='User' icon={null} showFallback className="cursor-pointer" />
            </>
        );
    }

    if (status === 'authenticated') return user();
    else if (status === 'unauthenticated') return noUser();
    return (<Skeleton className="flex rounded-full w-10 h-10" />);
}