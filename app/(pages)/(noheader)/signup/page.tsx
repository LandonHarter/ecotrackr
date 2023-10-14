import Image from 'next/image';
import Link from 'next/link';
import SignUpForm from './form';
import styles from './page.module.scss';

export default function SignUpPage() {
    return (
        <>
            <Link href='/' className='absolute left-4 top-4 flex items-center'>
                <Image src='/images/icons/icon128.png' alt='icon' width={45} height={45} />
                <h1 className='text-2xl h-fit mx-2 flex'>eco<div className='mr-px' /><strong className='font-bold'>trackr</strong></h1>
            </Link>
            <div className='w-screen h-screen flex'>
                <div className={`h-screen flex flex-col justify-center items-center ${styles.form_container}`}>
                    <SignUpForm />
                </div>
                <div className={`h-screen ${styles.right}`} />
            </div>
        </>
    );
}