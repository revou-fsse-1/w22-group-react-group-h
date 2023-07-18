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

interface IFormInput {
  username: string;
  name: string;
  email: string;
}

export default function EditProfile() {
  async function fetcher(url: string) {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log('wewew', response.data);

    return response.data;
  }

  const { data, error } = useSWR(
    'https://apikgems.cobainweb.site/api/users/me',
    fetcher,
  );

  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  async function onSubmit(formData: IFormInput) {
    try {
      console.log('assdata', formData);
      await axios.put(
        `https://apikgems.cobainweb.site/api/users/me`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      router.back();
    } catch (error: any) {
      console.error('Error updating data:', error);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  setValue('username', data.username);
  setValue('name', data.name);
  setValue('email', data.email);

  return (
    <>
      <Head>
        <title>Edit Profile | Apikgems </title>
      </Head>

      <div className="grow px-10 py-10 mx-auto flex flex-col justify-center items-center place-content-start backdrop-blur-md backdrop-brightness-90 hero gap-5 divide-y">
        <div className="flex w-full gap-8">
          <Image
            src="/profile-picture.jpg"
            alt="profile picture"
            height={240}
            width={240}
          ></Image>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="flex gap-8 justify-between mb-4">
                <span>Username</span>
                <input {...register('username')} placeholder="username" />
              </label>

              <label className="flex gap-8 justify-between mb-4">
                <span>Name</span>
                <input {...register('name')} placeholder="Name" />
              </label>

              <label className="flex gap-8 justify-between mb-4">
                <span>Email</span>
                <input {...register('email')} placeholder="email@email.com" />
              </label>
            </div>

            <button className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4">
              Save
            </button>

            <button
              className="rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="button"
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
