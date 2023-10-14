import Image from 'next/image';
import SignInForm from './form';
import Link from 'next/link';
import styles from './page.module.scss';
import NoAuth from '@/components/auth/noauth';

export default function SigninPage() {
    return (
        <NoAuth redirectUrl='/'>
            <Link href='/' className='absolute left-4 top-4 flex items-center'>
                <Image src='/images/icons/icon128.png' alt='icon' width={45} height={45} />
                <h1 className='text-2xl h-fit mx-2 flex'>eco<div className='mr-px' /><strong className='font-bold'>trackr</strong></h1>
            </Link>
            <div className='w-screen h-screen flex'>
                <div className={`h-screen flex flex-col justify-center items-center ${styles.form_container}`}>
                    <SignInForm />
                </div>
                <div className={`h-screen ${styles.right}`} />
            </div>
        </NoAuth>
    );
}