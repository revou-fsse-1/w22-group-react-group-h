//import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import { OwnedGameCard } from '@/components/OwnedGameCard';
import { OwnedGameCardProps } from '@/components/OwnedGameCard';
import Image from 'next/image';
//import { useProfile } from '@/hooks/useProfile';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ProfileImage } from '@/components/PorfileImage';
import { EditAvatar } from '@/components/EditAvatar';
import EditProfileForm from '@/components/EditProfileForm';

export default function EditProfile() {
  // const { register, handleSubmit, setValue } = useForm<IFormInput>();
  //   const [avatar, setAvatar] = useState('');
  //const [avatar, setAvatar] = useLocalStorage('');
  const router = useRouter();

  async function fetcher(url: string) {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log('fetch profile', response.data);

    return response.data;
  }

  const { data, error } = useSWR(
    'https://apikgems.cobainweb.site/api/users/me',
    fetcher,
    { shouldRetryOnError: false },
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Edit Profile | Apikgems </title>
      </Head>

      <div className="grow px-10 py-10 mx-auto flex flex-col justify-center items-center place-content-start backdrop-blur-md backdrop-brightness-90 hero gap-5 divide-y">
        <div className="flex flex-col w-full gap-8">
          <div className="flex gap-8">
            {/* <ProfileImage userId={data.id} /> */}
            {/* <Image
            src="/profile-picture.jpg"
            alt="profile picture"
            height={240}
            width={240}
          ></Image> */}
            <EditProfileForm
              userId={data.id}
              username={data.username}
              name={data.name}
              email={data.email}
            />
            <EditAvatar userId={data.id} />
          </div>
        </div>
      </div>
    </>
  );
}
