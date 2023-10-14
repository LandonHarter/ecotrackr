'use client'

import CalandarSVG from "@/svg/calandar";
import DownloadSVG from "@/svg/download";
import { Button, Spinner } from "@nextui-org/react";
import styles from '../../page.module.scss';
import LinkSVG from "@/svg/link";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Regulation } from "@/types/regulation";

async function fetchRegulations() {
  const url = 'https://api.regulations.gov/v4/documents';
  const params = {
    'filter[searchTerm]': 'pollution',
    'filter[documentType]': 'Rule',
    'sort': '-postedDate',
    'page[size]': '24',
    'api_key': process.env.NEXT_PUBLIC_GOV_API_KEY ?? ''
  };
  const searchParams = new URLSearchParams(params);
  const response = await fetch(`${url}?${searchParams.toString()}`);
  return await response.json();
}

async function fetchRegulation(id: string) {
  const response = await fetch(`https://api.regulations.gov/v4/documents/${id}?include=attachments&api_key=${process.env.NEXT_PUBLIC_GOV_API_KEY ?? ''}`);
  return await response.json();
}

export default function DashboardMainRegulations() {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const regulations = await fetchRegulations();
      setRegulations(regulations.data as Regulation[]);
      setLoading(false);
    })();
  }, []);

  function RegulationCard({ title, date, link, id }: { title: string, date: Date, link: string, id: string }) {
    return (
      <div className='w-[350px] h-[225px] p-6 rounded-xl flex flex-col justify-between bg-white shadow-[0px_0px_40px_0px_rgba(0,0,0,0.15)] m-2'>
        <div className='flex flex-col'>
          <h1 className='font-medium text-2xl mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>{title}</h1>
          <div className='flex items-center'>
            <CalandarSVG className='w-5 h-5 mr-2' />
            <p className='font-medium text-gray-400 text-lg'>{date.toLocaleDateString()}</p>
          </div>
        </div>
        <div className='flex items-center'>
          <Button className='bg-[hsl(var(--nextui-primary-300))] mr-2' isIconOnly onPress={async () => {
            const regulation = await fetchRegulation(id);
            const url = regulation.data.attributes.fileFormats[0].fileUrl;
            window.open(url, '_blank');
          }}>
            <DownloadSVG className={styles.download_icon} />
          </Button>
          <Link href={link} target='_blank'>
            <Button isIconOnly>
              <LinkSVG className={styles.link_icon} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col items-center p-8'>
      <h1 className='font-bold text-center text-[#353535] text-5xl mb-4 mt-8'>Environmental Regulations</h1>
      <p className='text-center text-gray-400 text-2xl mb-16'>What is being done to help?</p>

      <div className='w-full flex flex-wrap justify-center'>
        {regulations.map((regulation) => (
          <>
            <RegulationCard title={regulation.attributes.title} date={new Date(regulation.attributes.postedDate)} link={`https://www.google.com/search?q=${regulation.attributes.title.split(' ').join('+')}`} id={regulation.id} />
          </>
        ))}
        {loading &&
          <div className='w-full h-64 flex items-center justify-center'>
            <Spinner color='primary' size='lg' />
          </div>
        }
      </div>
    </div>
  );
}
