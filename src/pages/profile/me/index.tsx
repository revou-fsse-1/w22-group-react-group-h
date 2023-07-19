//import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import { OwnedGameCard } from '@/components/OwnedGameCard';
import { OwnedGameCardProps } from '@/components/OwnedGameCard';
import Image from 'next/image';
import { useProfile } from '@/hooks/useProfile';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileImage } from '@/components/PorfileImage';

interface IFormInput {
  username: String;
  name: String;
  email: String;
}

async function fetcher(url: string) {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data;
}

export default function MyProfile() {
  const { data, error, isLoading } = useSWR(
    'https://apikgems.cobainweb.site/api/users/me',
    fetcher,
  );

  const router = useRouter();
  // const [amount, setAmount] = useState(0);

  if (error) {
    return <div>Error fetching data</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile | Apikgems </title>
      </Head>

      <div className="grow px-10 py-10 mx-auto flex flex-col justify-center items-center place-content-start backdrop-blur-md backdrop-brightness-90 hero gap-5 divide-y">
        <div className="flex w-full gap-8">
          <ProfileImage userId={data.id} />
          <div>
            <p className=" text-3xl font-medium">{data.username}</p>
            <p className=" pb-24 text-m">{data.name}</p>
            <button
              className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                router.push('/profile/me/edit', undefined, { shallow: true });
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="pt-5 flex flex-col">
          <h1 className="text-white">Games Owned: {data.games.length}</h1>
          <div className="pt-3 gap-x-5 gap-y-10 flex flex-wrap flex-row justify-between">
            {data.games.map((game: OwnedGameCardProps) => (
              <OwnedGameCard
                key={game.id}
                id={game.id}
                name={game.name}
                imageUrl={game.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   //const token = window.localStorage.getItem('token');
//   try {
//     const response = await axios.get(
//       'https://apikgems.cobainweb.site/api/users/me',
//       {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllb3dpdHgwMDAycGQwamU5a2hiNmh3IiwiaWF0IjoxNjg5NDAwOTU4LCJleHAiOjE2ODk0MDQ1NTh9.yZXsY5UvRWOaKoGlcfXks5cUofa9MT1zhLMHvCj5mtg`,
//         },
//       },
//     );

//     const data = response.data;

//     return {
//       props: { data },
//     };
//   } catch (error: any) {
//     console.error('Error fetching data:', error);

//     return {
//       props: {},
//     };
//   }
// };
