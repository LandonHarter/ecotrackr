'use client'

import CalandarSVG from "@/svg/calandar";
import DownloadSVG from "@/svg/download";
import { Button } from "@nextui-org/react";
import styles from '../../page.module.scss';
import LinkSVG from "@/svg/link";

export default function DashboardMainActivities() {
  function RegulationCard({ title, date, link }: { title: string, date: Date, link: string }) {
    return (
      <div className='w-[350px] h-[225px] p-6 rounded-xl flex flex-col justify-between bg-white shadow-[0px_0px_40px_0px_rgba(0,0,0,0.15)]'>
        <div className='flex flex-col'>
          <h1 className='font-medium text-2xl mb-2'>{title}</h1>
          <div className='flex items-center'>
            <CalandarSVG className='w-5 h-5 mr-2' />
            <p className='font-medium text-gray-400 text-lg'>{date.toLocaleDateString()}</p>
          </div>
        </div>
        <div className='flex items-center'>
          <Button className='bg-[hsl(var(--nextui-primary-300))] mr-2' isIconOnly>
            <DownloadSVG className={styles.download_icon} />
          </Button>
          <Button isIconOnly>
            <LinkSVG className={styles.link_icon} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col items-center p-8'>
      <h1 className='font-bold text-center text-[#353535] text-5xl mb-4'>Environmental Regulations</h1>
      <p className='text-center text-gray-400 text-2xl mb-16'>Personalized in your area, for you</p>

      <div className='w-full flex flex-wrap'>
        <RegulationCard title="U.S.DOT/RSPA - Response to Wausau Water Works" date={new Date()} link="https://www.epa.gov/clean-air-act-overview" />
      </div>
    </div>
  );
}
